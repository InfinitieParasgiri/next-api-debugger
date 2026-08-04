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
}

function buildFullUrl(config: any): string {
  const base = config?.baseURL || '';
  const url = config?.url || '';
  if (/^https?:\/\//i.test(url)) return url;
  return `${base}${base && !base.endsWith('/') && !url.startsWith('/') ? '/' : ''}${url}`;
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
    const meta: AxiosMeta = { id: generateId(), startTime: Date.now(), startPerf: performance.now() };
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
    };
    const duration = Math.round(performance.now() - meta.startPerf);
    const { endpoint, queryParams } = parseUrl(url);
    const requestBodyRaw = safeStringify(config.data);
    const responseBodyRaw = response?.data !== undefined ? safeStringify(response.data) : null;
    const status: number | null = response?.status ?? error?.response?.status ?? null;

    const entry: ApiLogEntry = {
      id: meta.id,
      url,
      endpoint,
      method: (config.method || 'get').toUpperCase(),
      requestHeaders: normalizeHeaders(config.headers),
      requestBody: config.data ?? safeParseJson(requestBodyRaw),
      requestBodyRaw,
      queryParams: { ...queryParams, ...(config.params || {}) },
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
