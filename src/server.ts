import type { ApiLogEntry } from './types';

const STORE_KEY = Symbol.for('next-api-debugger.server-logs');
const SESSION_TTL_MS = 10 * 60 * 1000;
const MAX_SESSIONS = 100;
const MAX_LOGS_PER_SESSION = 200;
const MAX_BODY_BYTES = 32 * 1024;
const SESSION_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const PRIVATE_FIELD = /(?:authorization|cookie|token|password|secret|api[_-]?key|credential|session)/i;
const SAFE_HEADER = /^(?:accept|accept-language|cache-control|content-length|content-type|date|etag|vary|x-request-id)$/i;

interface SessionLogs {
  logs: ApiLogEntry[];
  touchedAt: number;
}

export interface ServerDebugOptions {
  /** Defaults to development only. Set true explicitly for an authorized production session. */
  enabled?: boolean;
  /** Include bounded public request/response details. Opt in only for non-sensitive API calls. */
  captureDetails?: boolean;
}

function isEnabled(options?: ServerDebugOptions): boolean {
  return options?.enabled ?? process.env.NODE_ENV !== 'production';
}

function sessions(): Map<string, SessionLogs> {
  const root = globalThis as typeof globalThis & { [STORE_KEY]?: Map<string, SessionLogs> };
  return (root[STORE_KEY] ??= new Map());
}

function prune(store: Map<string, SessionLogs>, now: number) {
  for (const [id, session] of store) {
    if (now - session.touchedAt > SESSION_TTL_MS) store.delete(id);
  }
  while (store.size > MAX_SESSIONS) {
    const oldest = store.keys().next().value;
    if (oldest === undefined) break;
    store.delete(oldest);
  }
}

function addServerLog(sessionId: string, entry: ApiLogEntry) {
  const store = sessions();
  const now = Date.now();
  prune(store, now);
  const session = store.get(sessionId) ?? { logs: [], touchedAt: now };
  session.logs.unshift(entry);
  session.logs.length = Math.min(session.logs.length, MAX_LOGS_PER_SESSION);
  session.touchedAt = now;
  store.delete(sessionId);
  store.set(sessionId, session);
  prune(store, now);
}

function safeUrl(input: RequestInfo | URL, captureDetails = false): { url: string; endpoint: string; queryParams: Record<string, string> } {
  const raw = input instanceof Request ? input.url : String(input);
  try {
    const parsed = new URL(raw);
    parsed.username = '';
    parsed.password = '';
    parsed.hash = '';
    const queryParams: Record<string, string> = {};
    parsed.searchParams.forEach((value, key) => {
      const safeValue = captureDetails && !PRIVATE_FIELD.test(key) ? value : '[redacted]';
      queryParams[key] = safeValue;
      parsed.searchParams.set(key, safeValue);
    });
    return { url: parsed.toString(), endpoint: parsed.pathname, queryParams };
  } catch {
    const endpoint = raw.split('?')[0];
    return { url: endpoint, endpoint, queryParams: {} };
  }
}

function safeHeaders(headers?: HeadersInit): Record<string, string> {
  const safe: Record<string, string> = {};
  if (!headers) return safe;
  new Headers(headers).forEach((value, key) => {
    if (SAFE_HEADER.test(key)) safe[key] = value;
  });
  return safe;
}

function redactBody(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(redactBody);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) =>
      [key, PRIVATE_FIELD.test(key) ? '[redacted]' : redactBody(item)]));
  }
  return value;
}

function bodyDetails(raw: string, truncated = false): { body: unknown; raw: string } {
  if (!truncated) {
    try {
      const body = redactBody(JSON.parse(raw));
      return { body, raw: JSON.stringify(body) };
    } catch { /* Plain text remains plain text. */ }
  }
  return { body: null, raw: `${raw}${truncated ? '\n[truncated]' : ''}` };
}

async function responseDetails(response: Response): Promise<{ body: unknown; raw: string | null; size: number }> {
  const type = response.headers.get('content-type') ?? '';
  if (!/(?:json|text|xml|javascript|x-www-form-urlencoded)/i.test(type)) return { body: null, raw: null, size: 0 };
  const reader = response.clone().body?.getReader();
  if (!reader) return { body: null, raw: null, size: 0 };
  const decoder = new TextDecoder();
  let raw = '';
  let size = 0;
  let truncated = false;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const remaining = MAX_BODY_BYTES - size;
      raw += decoder.decode(value.subarray(0, Math.max(0, remaining)), { stream: true });
      size += Math.min(value.byteLength, Math.max(0, remaining));
      if (value.byteLength > remaining || size === MAX_BODY_BYTES) {
        truncated = true;
        // A tee'd stream can wait for the original response to be consumed.
        void reader.cancel().catch(() => {});
        break;
      }
    }
    raw += decoder.decode();
    const details = bodyDetails(raw, truncated);
    return { ...details, size };
  } finally {
    reader.releaseLock();
  }
}

/**
 * Wrap a Next.js Node-side fetch without changing its input or response.
 * Records metadata by default. Detail capture must be explicitly enabled for public calls.
 */
export async function debugServerFetch(
  sessionId: string | null | undefined,
  input: RequestInfo | URL,
  init?: RequestInit,
  options?: ServerDebugOptions
): Promise<Response> {
  if (!isEnabled(options) || !sessionId || !SESSION_ID.test(sessionId)) {
    return fetch(input, init);
  }

  const startTime = Date.now();
  const startPerf = performance.now();
  const captureDetails = options?.captureDetails === true;
  const { url, endpoint, queryParams } = safeUrl(input, captureDetails);
  const method = (init?.method || (input instanceof Request ? input.method : 'GET')).toUpperCase();
  const requestHeaders = captureDetails ? safeHeaders(init?.headers ?? (input instanceof Request ? input.headers : undefined)) : {};
  const requestText = captureDetails && (typeof init?.body === 'string' || init?.body instanceof URLSearchParams)
    ? String(init.body).slice(0, MAX_BODY_BYTES) : null;
  const requestDetails = requestText === null ? null : bodyDetails(requestText);
  const base: ApiLogEntry = {
    id: `server-${startTime}-${Math.random().toString(36).slice(2)}`,
    url, endpoint, method, queryParams,
    requestHeaders, requestBody: requestDetails?.body ?? null, requestBodyRaw: requestDetails?.raw ?? null,
    requestSize: requestText ? new TextEncoder().encode(requestText).byteLength : 0,
    responseStatus: null, responseStatusText: '', responseHeaders: {},
    responseBody: null, responseBodyRaw: null, responseSize: 0,
    duration: 0, timestamp: startTime, success: false, error: null,
    source: 'server-fetch', pinned: false,
  };

  try {
    const response = await fetch(input, init);
    let details: { body: unknown; raw: string | null; size: number } = { body: null, raw: null, size: 0 };
    if (captureDetails) {
      try { details = await responseDetails(response); } catch { /* Debug capture must not fail the API call. */ }
    }
    addServerLog(sessionId, {
      ...base,
      responseStatus: response.status,
      responseStatusText: response.statusText,
      responseHeaders: captureDetails ? safeHeaders(response.headers) : {},
      responseBody: details.body,
      responseBodyRaw: details.raw,
      responseSize: Number(response.headers.get('content-length')) || details.size,
      duration: Math.round(performance.now() - startPerf),
      success: response.ok,
      error: response.ok ? null : `HTTP ${response.status} ${response.statusText}`,
    });
    return response;
  } catch (error) {
    addServerLog(sessionId, {
      ...base,
      duration: Math.round(performance.now() - startPerf),
      error: error instanceof Error ? error.name : 'Network error',
    });
    throw error;
  }
}

/** Read this visitor's recent server logs from a same-origin Node route. */
export function getServerLogs(sessionId: string | null | undefined, options?: ServerDebugOptions): ApiLogEntry[] {
  if (!isEnabled(options) || !sessionId || !SESSION_ID.test(sessionId)) return [];
  const store = sessions();
  prune(store, Date.now());
  return store.get(sessionId)?.logs.slice() ?? [];
}
