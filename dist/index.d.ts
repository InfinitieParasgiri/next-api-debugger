import * as react from 'react';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS' | string;
type RequestSource = 'fetch' | 'axios' | 'xhr';
interface ApiLogEntry {
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
interface ApiDebuggerProps {
    /** Force enable/disable. Defaults to `process.env.NODE_ENV !== 'production'`. */
    enabled?: boolean;
    /** Max number of logs retained in memory. Defaults to 200. */
    maxLogs?: number;
    /** Initial position of the floating button. */
    initialPosition?: {
        x: number;
        y: number;
    };
    /** An axios instance to also intercept (in addition to global fetch). */
    axiosInstance?: unknown;
    /** Color theme. Defaults to 'system'. */
    theme?: 'light' | 'dark' | 'system';
    /** Enable Ctrl/Cmd+Shift+D to toggle the modal. Defaults to true. */
    keyboardShortcut?: boolean;
    /** URL patterns to exclude from capture. */
    ignoreUrls?: (string | RegExp)[];
}
type StatusFilter = 'all' | 'success' | 'failed';
interface LogFilterState {
    search: string;
    status: StatusFilter;
    methods: HttpMethod[];
}

/**
 * Mount once, anywhere in your app (e.g. app/layout.tsx or pages/_app.tsx):
 *
 *   <ApiDebugger />
 *
 * Renders nothing and installs no interceptors when disabled (production by
 * default), so it's safe to leave in your tree.
 */
declare function ApiDebugger(props: ApiDebuggerProps): react.JSX.Element | null;

type Listener = () => void;
/**
 * Session-only, in-memory log store. No persistence, no backend.
 * Uses a simple pub/sub so React can bind via useSyncExternalStore.
 */
declare class LogStore {
    private logs;
    private listeners;
    private maxLogs;
    private snapshot;
    setMaxLogs(n: number): void;
    addLog(entry: ApiLogEntry): void;
    togglePin(id: string): void;
    clear(): void;
    getLogs: () => ApiLogEntry[];
    subscribe: (listener: Listener) => () => boolean;
    private trim;
    private emit;
}
declare const logStore: LogStore;

interface FetchInterceptorOptions {
    ignoreUrls?: (string | RegExp)[];
}
/**
 * Patches the global `fetch` to record every request/response into the log store.
 * Safe to call multiple times; only installs once. Fully reversible via
 * `uninstallFetchInterceptor()`.
 */
declare function installFetchInterceptor(options?: FetchInterceptorOptions): void;
declare function uninstallFetchInterceptor(): void;

interface AxiosInterceptorOptions {
    ignoreUrls?: (string | RegExp)[];
}
/**
 * Attaches request/response interceptors to a user-supplied axios instance.
 * Returns an `uninstall` function that ejects the interceptors.
 * No-ops safely if `axiosInstance` is not axios-shaped.
 */
declare function installAxiosInterceptor(axiosInstance: any, options?: AxiosInterceptorOptions): () => void;

/** Builds a ready-to-paste cURL command for a captured request. */
declare function generateCurl(entry: ApiLogEntry): string;

/** Converts captured logs into a minimal, valid HAR 1.2 document. */
declare function exportAsHar(logs: ApiLogEntry[]): {
    log: {
        version: string;
        creator: {
            name: string;
            version: string;
        };
        entries: {
            startedDateTime: string;
            time: number;
            request: {
                method: string;
                url: string;
                httpVersion: string;
                headers: {
                    name: string;
                    value: string;
                }[];
                queryString: {
                    name: string;
                    value: string;
                }[];
                cookies: never[];
                headersSize: number;
                bodySize: number;
                postData: {
                    mimeType: string;
                    text: string;
                } | undefined;
            };
            response: {
                status: number;
                statusText: string;
                httpVersion: string;
                headers: {
                    name: string;
                    value: string;
                }[];
                cookies: never[];
                content: {
                    size: number;
                    mimeType: string;
                    text: string;
                };
                redirectURL: string;
                headersSize: number;
                bodySize: number;
            };
            cache: {};
            timings: {
                send: number;
                wait: number;
                receive: number;
            };
        }[];
    };
};

export { ApiDebugger, type ApiDebuggerProps, type ApiLogEntry, type HttpMethod, type LogFilterState, type StatusFilter, exportAsHar, generateCurl, installAxiosInterceptor, installFetchInterceptor, logStore, uninstallFetchInterceptor };
