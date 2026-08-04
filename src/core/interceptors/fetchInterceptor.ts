import { logStore } from '../logStore';
import { ApiLogEntry } from '../../types';
import {
  byteSize,
  generateId,
  headersToObject,
  parseUrl,
  safeParseJson,
  shouldIgnore,
} from '../utils';

let originalFetch: typeof fetch | null = null;
let installed = false;

export interface FetchInterceptorOptions {
  ignoreUrls?: (string | RegExp)[];
}

function extractRequestBodyRaw(body: BodyInit | null | undefined): string | null {
  if (body == null) return null;
  if (typeof body === 'string') return body;
  if (body instanceof URLSearchParams) return body.toString();
  if (body instanceof FormData) {
    const entries: string[] = [];
    body.forEach((value, key) => {
      entries.push(`${key}=${value instanceof File ? `[File: ${value.name}]` : value}`);
    });
    return entries.join('&');
  }
  // Blob / ArrayBuffer / ReadableStream: not safely readable without consuming the
  // stream the app itself needs, so we just note the type.
  return '[binary data]';
}

/**
 * Patches the global `fetch` to record every request/response into the log store.
 * Safe to call multiple times; only installs once. Fully reversible via
 * `uninstallFetchInterceptor()`.
 */
export function installFetchInterceptor(options: FetchInterceptorOptions = {}) {
  if (installed || typeof window === 'undefined' || typeof window.fetch !== 'function') return;

  originalFetch = window.fetch.bind(window);
  installed = true;

  window.fetch = async function patchedFetch(
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> {
    const request = input instanceof Request ? input : null;
    const url = request ? request.url : String(input);

    if (shouldIgnore(url, options.ignoreUrls)) {
      return originalFetch!(input as any, init);
    }

    const startTime = Date.now();
    const startPerf = performance.now();
    const method = (init?.method || request?.method || 'GET').toUpperCase();
    const requestHeaders = headersToObject(
      new Headers(init?.headers ?? request?.headers ?? undefined)
    );
    const { endpoint, queryParams } = parseUrl(url);
    const requestBodyRaw = extractRequestBodyRaw(init?.body ?? null);

    const base: Omit<
      ApiLogEntry,
      | 'duration'
      | 'responseStatus'
      | 'responseStatusText'
      | 'responseHeaders'
      | 'responseBody'
      | 'responseBodyRaw'
      | 'responseSize'
      | 'success'
      | 'error'
    > = {
      id: generateId(),
      url,
      endpoint,
      method,
      requestHeaders,
      requestBody: safeParseJson(requestBodyRaw),
      requestBodyRaw,
      queryParams,
      timestamp: startTime,
      source: 'fetch',
      requestSize: byteSize(requestBodyRaw),
      pinned: false,
    };

    try {
      const response = await originalFetch!(input as any, init);
      const duration = Math.round(performance.now() - startPerf);

      // Clone so the consuming application can still read the original body.
      const cloned = response.clone();
      let responseBodyRaw: string | null = null;
      try {
        responseBodyRaw = await cloned.text();
      } catch {
        responseBodyRaw = null;
      }

      logStore.addLog({
        ...base,
        duration,
        responseStatus: response.status,
        responseStatusText: response.statusText,
        responseHeaders: headersToObject(response.headers),
        responseBody: safeParseJson(responseBodyRaw),
        responseBodyRaw,
        responseSize: byteSize(responseBodyRaw),
        success: response.ok,
        error: response.ok ? null : `HTTP ${response.status} ${response.statusText}`,
      });

      return response;
    } catch (err: any) {
      const duration = Math.round(performance.now() - startPerf);
      logStore.addLog({
        ...base,
        duration,
        responseStatus: null,
        responseStatusText: '',
        responseHeaders: {},
        responseBody: null,
        responseBodyRaw: null,
        responseSize: 0,
        success: false,
        error: err?.message || 'Network error',
      });
      throw err;
    }
  };
}

export function uninstallFetchInterceptor() {
  if (installed && originalFetch && typeof window !== 'undefined') {
    window.fetch = originalFetch;
  }
  installed = false;
  originalFetch = null;
}
