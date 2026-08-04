export type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'
  | string;

export type RequestSource = 'fetch' | 'axios';

export interface ApiLogEntry {
  id: string;
  url: string;
  endpoint: string;
  method: HttpMethod;
  requestHeaders: Record<string, string>;
  requestBody: unknown;
  requestBodyRaw: string | null;
  queryParams: Record<string, string>;
  responseStatus: number | null;
  responseStatusText: string;
  responseHeaders: Record<string, string>;
  responseBody: unknown;
  responseBodyRaw: string | null;
  duration: number;
  timestamp: number;
  success: boolean;
  error: string | null;
  source: RequestSource;
  requestSize: number;
  responseSize: number;
  pinned: boolean;
}

export interface ApiDebuggerProps {
  /** Force enable/disable. Defaults to `process.env.NODE_ENV !== 'production'`. */
  enabled?: boolean;
  /** Max number of logs retained in memory. Defaults to 200. */
  maxLogs?: number;
  /** Initial position of the floating button. */
  initialPosition?: { x: number; y: number };
  /** An axios instance to also intercept (in addition to global fetch). */
  axiosInstance?: unknown;
  /** Color theme. Defaults to 'system'. */
  theme?: 'light' | 'dark' | 'system';
  /** Enable Ctrl/Cmd+Shift+D to toggle the modal. Defaults to true. */
  keyboardShortcut?: boolean;
  /** URL patterns to exclude from capture. */
  ignoreUrls?: (string | RegExp)[];
}

export type StatusFilter = 'all' | 'success' | 'failed';

export interface LogFilterState {
  search: string;
  status: StatusFilter;
  methods: HttpMethod[];
}
