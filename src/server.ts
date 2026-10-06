import type { ApiLogEntry } from './types';

const STORE_KEY = Symbol.for('next-api-debugger.server-logs');
const SESSION_TTL_MS = 10 * 60 * 1000;
const MAX_SESSIONS = 100;
const MAX_LOGS_PER_SESSION = 200;
const SESSION_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

interface SessionLogs {
  logs: ApiLogEntry[];
  touchedAt: number;
}

export interface ServerDebugOptions {
  /** Defaults to development only. Set true explicitly for an authorized production session. */
  enabled?: boolean;
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

function safeUrl(input: RequestInfo | URL): { url: string; endpoint: string; queryParams: Record<string, string> } {
  const raw = input instanceof Request ? input.url : String(input);
  try {
    const parsed = new URL(raw);
    parsed.username = '';
    parsed.password = '';
    parsed.hash = '';
    const queryParams: Record<string, string> = {};
    parsed.searchParams.forEach((_value, key) => { queryParams[key] = '[redacted]'; });
    for (const key of parsed.searchParams.keys()) parsed.searchParams.set(key, '[redacted]');
    return { url: parsed.toString(), endpoint: parsed.pathname, queryParams };
  } catch {
    const endpoint = raw.split('?')[0];
    return { url: endpoint, endpoint, queryParams: {} };
  }
}

/**
 * Wrap a Next.js Node-side fetch without changing its input or response.
 * Records metadata only; headers and bodies stay on the server.
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
  const { url, endpoint, queryParams } = safeUrl(input);
  const method = (init?.method || (input instanceof Request ? input.method : 'GET')).toUpperCase();
  const base: ApiLogEntry = {
    id: `server-${startTime}-${Math.random().toString(36).slice(2)}`,
    url, endpoint, method, queryParams,
    requestHeaders: {}, requestBody: null, requestBodyRaw: null, requestSize: 0,
    responseStatus: null, responseStatusText: '', responseHeaders: {},
    responseBody: null, responseBodyRaw: null, responseSize: 0,
    duration: 0, timestamp: startTime, success: false, error: null,
    source: 'server-fetch', pinned: false,
  };

  try {
    const response = await fetch(input, init);
    addServerLog(sessionId, {
      ...base,
      responseStatus: response.status,
      responseStatusText: response.statusText,
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
