/**
 * Internal marker header used to prevent double-logging: when the axios
 * interceptor is active, it tags each outgoing request with this header so
 * the generic fetch/XHR interceptors (which axios itself is built on top
 * of under the hood) can recognize "this one is already being logged at
 * the axios level" and skip it — deleting the header before the request
 * actually goes out, so nothing extra is ever sent over the wire or risks
 * tripping a CORS preflight.
 */
export const APD_SUPPRESS_HEADER = 'x-apd-skip';

export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export function safeParseJson(raw: string | null | undefined): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

export function safeStringify(value: unknown): string | null {
  if (value === undefined || value === null) return null;
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export function byteSize(raw: string | null | undefined): number {
  if (!raw) return 0;
  try {
    return new Blob([raw]).size;
  } catch {
    return raw.length;
  }
}

export function formatBytes(bytes: number): string {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  const value = bytes / Math.pow(1024, i);
  return `${i === 0 ? value : value.toFixed(1)} ${units[i]}`;
}

export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms} ms`;
  return `${(ms / 1000).toFixed(2)} s`;
}

export function formatTimestamp(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleTimeString(undefined, { hour12: false }) + `.${String(d.getMilliseconds()).padStart(3, '0')}`;
}

export function parseUrl(url: string): { endpoint: string; queryParams: Record<string, string> } {
  try {
    const base = typeof window !== 'undefined' ? window.location.origin : 'http://localhost';
    const u = new URL(url, base);
    const queryParams: Record<string, string> = {};
    u.searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });
    return { endpoint: u.pathname, queryParams };
  } catch {
    return { endpoint: url, queryParams: {} };
  }
}

export function headersToObject(headers: Headers | undefined | null): Record<string, string> {
  const result: Record<string, string> = {};
  if (!headers) return result;
  headers.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

/** Normalizes axios-style headers (object, AxiosHeaders instance, etc.) into a plain object. */
export function normalizeHeaders(headers: unknown): Record<string, string> {
  const result: Record<string, string> = {};
  if (!headers) return result;
  if (typeof (headers as any).toJSON === 'function') {
    return { ...(headers as any).toJSON() };
  }
  if (headers instanceof Headers) return headersToObject(headers);
  if (typeof headers === 'object') {
    for (const [key, value] of Object.entries(headers as Record<string, unknown>)) {
      if (value !== undefined && value !== null) result[key] = String(value);
    }
  }
  return result;
}

export function shouldIgnore(url: string, patterns?: (string | RegExp)[]): boolean {
  if (!patterns || patterns.length === 0) return false;
  return patterns.some((p) => (p instanceof RegExp ? p.test(url) : url.includes(p)));
}

export function classNames(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy method */
  }
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}
