import { logStore } from '../logStore';
import { ApiLogEntry } from '../../types';
import {
  byteSize,
  generateId,
  normalizeHeaders,
  parseUrl,
  safeParseJson,
  safeStringify,
  shouldIgnore,
} from '../utils';

export interface AxiosInterceptorOptions {
  ignoreUrls?: (string | RegExp)[];
}

interface AxiosMeta {
  id: string;
  startTime: number;
  startPerf: number;
  requestBodyRaw: string | null;
  requestHeadersSnapshot: Record<string, string>;
}

function buildFullUrl(config: any): string {
  const base = config?.baseURL || '';
  const path = config?.url || '';
  let url = /^https?:\/\//i.test(path)
    ? path
    : `${base}${base && !base.endsWith('/') && !path.startsWith('/') ? '/' : ''}${path}`;

  // axios sends `config.params` separately from the URL string — it only
  // gets serialized into the querystring right before the request goes out
  // over the wire, using axios's own (or a custom) paramsSerializer. Since
  // we're not hooking that step, we serialize independently here so the
  // logged URL — and therefore the generated cURL — actually matches what
  // was sent.
  if (config?.params && typeof config.params === 'object') {
    const query = serializeParams(config.params);
    if (query) url += (url.includes('?') ? '&' : '?') + query;
  }

  return url;
}

function serializeParams(params: Record<string, unknown>): string {
  const usp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      value.forEach((v) => usp.append(key, String(v)));
    } else {
      usp.append(key, String(value));
    }
  }
  return usp.toString();
}

/** Captures the outgoing body exactly as handed to axios, before axios's own
 *  transformRequest pipeline has a chance to mutate/replace `config.data`. */
function snapshotRequestBody(data: unknown): string | null {
  if (data === undefined || data === null) return null;
  if (typeof data === 'string') return data;
  if (typeof URLSearchParams !== 'undefined' && data instanceof URLSearchParams) return data.toString();
  if (typeof FormData !== 'undefined' && data instanceof FormData) {
    const parts: string[] = [];
    (data as FormData).forEach((value, key) => {
      parts.push(`${key}=${value instanceof File ? `[File: ${value.name}]` : value}`);
    });
    return parts.join('&');
  }
  return safeStringify(data);
}

/**
 * Attaches request/response interceptors to a user-supplied axios instance.
 * Returns an `uninstall` function that ejects the interceptors.
 * No-ops safely if `axiosInstance` is not axios-shaped.
 */
export function installAxiosInterceptor(
  axiosInstance: any,
  options: AxiosInterceptorOptions = {}
): () => void {
  if (
    !axiosInstance ||
    !axiosInstance.interceptors ||
    typeof axiosInstance.interceptors.request?.use !== 'function'
  ) {
    return () => {};
  }
  if (axiosInstance.__apiDebuggerInstalled) return () => {};
  axiosInstance.__apiDebuggerInstalled = true;

  const requestInterceptorId = axiosInstance.interceptors.request.use((config: any) => {
    const meta: AxiosMeta = {
      id: generateId(),
      startTime: Date.now(),
      startPerf: performance.now(),
      // Snapshot NOW: axios rewrites config.data (JSON.stringify, form
      // encoding, etc.) further down the pipeline, so this is the only
      // reliable point to capture exactly what was passed in.
      requestBodyRaw: snapshotRequestBody(config.data),
      requestHeadersSnapshot: normalizeHeaders(config.headers),
    };
    config.__apdMeta = meta;
    return config;
  });

  function recordLog(config: any, response: any, error?: any) {
    if (!config) return;
    const url = buildFullUrl(config);
    if (shouldIgnore(url, options.ignoreUrls)) return;

    const meta: AxiosMeta = config.__apdMeta || {
      id: generateId(),
      startTime: Date.now(),
      startPerf: performance.now(),
      requestBodyRaw: snapshotRequestBody(config.data),
      requestHeadersSnapshot: normalizeHeaders(config.headers),
    };
    const duration = Math.round(performance.now() - meta.startPerf);
    const { endpoint, queryParams } = parseUrl(url);
    // Prefer the final header state (response time) since axios fills in
    // things like Content-Type only once the request actually goes out —
    // but fall back to the request-time snapshot if headers are gone by then.
    const finalHeaders = normalizeHeaders(config.headers);
    const requestHeaders = Object.keys(finalHeaders).length > 0 ? finalHeaders : meta.requestHeadersSnapshot;
    const requestBodyRaw = meta.requestBodyRaw;
    const responseBodyRaw = response?.data !== undefined ? safeStringify(response.data) : null;
    const status: number | null = response?.status ?? error?.response?.status ?? null;

    const entry: ApiLogEntry = {
      id: meta.id,
      url,
      endpoint,
      method: (config.method || 'get').toUpperCase(),
      requestHeaders,
      requestBody: safeParseJson(requestBodyRaw) ?? requestBodyRaw,
      requestBodyRaw,
      queryParams,
      responseStatus: status,
      responseStatusText: response?.statusText ?? '',
      responseHeaders: normalizeHeaders(response?.headers),
      responseBody: response?.data ?? null,
      responseBodyRaw,
      duration,
      timestamp: meta.startTime,
      success: !error && !!status && status < 400,
      error: error ? error.message || 'Request failed' : null,
      source: 'axios',
      requestSize: byteSize(requestBodyRaw),
      responseSize: byteSize(responseBodyRaw),
      pinned: false,
    };

    logStore.addLog(entry);
  }

  const responseInterceptorId = axiosInstance.interceptors.response.use(
    (response: any) => {
      recordLog(response.config, response);
      return response;
    },
    (error: any) => {
      recordLog(error?.config, error?.response, error);
      return Promise.reject(error);
    }
  );

  return () => {
    axiosInstance.interceptors.request.eject(requestInterceptorId);
    axiosInstance.interceptors.response.eject(responseInterceptorId);
    axiosInstance.__apiDebuggerInstalled = false;
  };
}
