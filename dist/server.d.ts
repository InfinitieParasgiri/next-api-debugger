type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS' | string;
type RequestSource = 'fetch' | 'axios' | 'xhr' | 'server-fetch';
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

interface ServerDebugOptions {
    /** Defaults to development only. Set true explicitly for an authorized production session. */
    enabled?: boolean;
}
/**
 * Wrap a Next.js Node-side fetch without changing its input or response.
 * Records metadata only; headers and bodies stay on the server.
 */
declare function debugServerFetch(sessionId: string | null | undefined, input: RequestInfo | URL, init?: RequestInit, options?: ServerDebugOptions): Promise<Response>;
/** Read this visitor's recent server logs from a same-origin Node route. */
declare function getServerLogs(sessionId: string | null | undefined, options?: ServerDebugOptions): ApiLogEntry[];

export { type ServerDebugOptions, debugServerFetch, getServerLogs };
