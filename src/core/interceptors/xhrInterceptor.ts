import { logStore } from '../logStore';
import { ApiLogEntry } from '../../types';
import { APD_SUPPRESS_HEADER, byteSize, generateId, parseUrl, safeParseJson, shouldIgnore } from '../utils';

export interface XhrInterceptorOptions {
  ignoreUrls?: (string | RegExp)[];
}

let originalOpen: typeof XMLHttpRequest.prototype.open | null = null;
let originalSend: typeof XMLHttpRequest.prototype.send | null = null;
let originalSetRequestHeader: typeof XMLHttpRequest.prototype.setRequestHeader | null = null;
let installed = false;

interface XhrMeta {
  id: string;
  method: string;
  url: string;
  startTime: number;
  startPerf: number;
  requestHeaders: Record<string, string>;
  ignored: boolean;
}

const META = Symbol('apd-xhr-meta');

function parseResponseHeaders(raw: string): Record<string, string> {
  const result: Record<string, string> = {};
  raw
    .trim()
    .split(/[\r\n]+/)
    .forEach((line) => {
      const idx = line.indexOf(':');
      if (idx === -1) return;
      const key = line.slice(0, idx).trim().toLowerCase();
      const value = line.slice(idx + 1).trim();
      if (key) result[key] = value;
    });
  return result;
}

/**
 * Patches `XMLHttpRequest.prototype` so anything using raw XHR — jQuery's
 * `$.ajax`, older Angular `$http` backends, hand-rolled AJAX, etc. — gets
 * captured the same way fetch/axios calls are. Reversible via
 * `uninstallXhrInterceptor()`.
 */
export function installXhrInterceptor(options: XhrInterceptorOptions = {}) {
  if (installed || typeof window === 'undefined' || typeof XMLHttpRequest === 'undefined') return;

  originalOpen = XMLHttpRequest.prototype.open;
  originalSend = XMLHttpRequest.prototype.send;
  originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
  installed = true;

  XMLHttpRequest.prototype.open = function patchedOpen(
    this: XMLHttpRequest & { [META]?: XhrMeta },
    method: string,
    url: string | URL,
    ...rest: any[]
  ) {
    const resolvedUrl = String(url);
    this[META] = {
      id: generateId(),
      method: (method || 'GET').toUpperCase(),
      url: resolvedUrl,
      startTime: 0,
      startPerf: 0,
      requestHeaders: {},
      ignored: shouldIgnore(resolvedUrl, options.ignoreUrls),
    };
    return originalOpen!.apply(this, [method, url, ...rest] as any);
  };

  XMLHttpRequest.prototype.setRequestHeader = function patchedSetRequestHeader(
    this: XMLHttpRequest & { [META]?: XhrMeta },
    name: string,
    value: string
  ) {
    // Requests already being logged by the axios interceptor carry this
    // marker — swallow it here (never forward to the real XHR, so it never
    // reaches the network or a CORS preflight) and skip logging this call
    // a second time.
    if (name.toLowerCase() === APD_SUPPRESS_HEADER) {
      if (this[META]) this[META]!.ignored = true;
      return;
    }
    if (this[META]) this[META]!.requestHeaders[name] = value;
    return originalSetRequestHeader!.apply(this, [name, value]);
  };

  XMLHttpRequest.prototype.send = function patchedSend(
    this: XMLHttpRequest & { [META]?: XhrMeta },
    body?: Document | XMLHttpRequestBodyInit | null
  ) {
    const meta = this[META];
    if (!meta || meta.ignored) {
      return originalSend!.apply(this, [body as any]);
    }

    meta.startTime = Date.now();
    meta.startPerf = performance.now();

    const requestBodyRaw =
      body == null
        ? null
        : typeof body === 'string'
          ? body
          : body instanceof URLSearchParams
            ? body.toString()
            : body instanceof FormData
              ? '[form data]'
              : '[binary data]';

    const onLoadEnd = () => {
      const duration = Math.round(performance.now() - meta.startPerf);
      const { endpoint, queryParams } = parseUrl(meta.url);
      const responseHeaders = parseResponseHeaders(this.getAllResponseHeaders() || '');
      let responseBodyRaw: string | null = null;
      try {
        responseBodyRaw = typeof this.responseText === 'string' ? this.responseText : null;
      } catch {
        responseBodyRaw = null;
      }
      const status = this.status;
      const success = status >= 200 && status < 400;

      const entry: ApiLogEntry = {
        id: meta.id,
        url: meta.url,
        endpoint,
        method: meta.method,
        requestHeaders: meta.requestHeaders,
        requestBody: safeParseJson(requestBodyRaw),
        requestBodyRaw,
        queryParams,
        responseStatus: status || null,
        responseStatusText: this.statusText || '',
        responseHeaders,
        responseBody: safeParseJson(responseBodyRaw),
        responseBodyRaw,
        duration,
        timestamp: meta.startTime,
        success,
        error: success ? null : status === 0 ? 'Network error' : `HTTP ${status} ${this.statusText}`,
        source: 'xhr',
        requestSize: byteSize(requestBodyRaw),
        responseSize: byteSize(responseBodyRaw),
        pinned: false,
      };

      logStore.addLog(entry);
      this.removeEventListener('loadend', onLoadEnd);
    };

    this.addEventListener('loadend', onLoadEnd);
    return originalSend!.apply(this, [body as any]);
  };
}

export function uninstallXhrInterceptor() {
  if (installed && typeof window !== 'undefined' && typeof XMLHttpRequest !== 'undefined') {
    if (originalOpen) XMLHttpRequest.prototype.open = originalOpen;
    if (originalSend) XMLHttpRequest.prototype.send = originalSend;
    if (originalSetRequestHeader) XMLHttpRequest.prototype.setRequestHeader = originalSetRequestHeader;
  }
  installed = false;
  originalOpen = null;
  originalSend = null;
  originalSetRequestHeader = null;
}
