import { ApiLogEntry } from '../types';

function toHarHeaders(headers: Record<string, string>) {
  return Object.entries(headers).map(([name, value]) => ({ name, value }));
}

function toHarQuery(params: Record<string, string>) {
  return Object.entries(params).map(([name, value]) => ({ name, value }));
}

/** Converts captured logs into a minimal, valid HAR 1.2 document. */
export function exportAsHar(logs: ApiLogEntry[]) {
  return {
    log: {
      version: '1.2',
      creator: { name: 'next-api-debugger', version: '0.1.0' },
      entries: logs.map((entry) => ({
        startedDateTime: new Date(entry.timestamp).toISOString(),
        time: entry.duration,
        request: {
          method: entry.method,
          url: entry.url,
          httpVersion: 'HTTP/1.1',
          headers: toHarHeaders(entry.requestHeaders),
          queryString: toHarQuery(entry.queryParams),
          cookies: [],
          headersSize: -1,
          bodySize: entry.requestSize,
          postData: entry.requestBodyRaw
            ? {
                mimeType: entry.requestHeaders['content-type'] || 'application/json',
                text: entry.requestBodyRaw,
              }
            : undefined,
        },
        response: {
          status: entry.responseStatus ?? 0,
          statusText: entry.responseStatusText,
          httpVersion: 'HTTP/1.1',
          headers: toHarHeaders(entry.responseHeaders),
          cookies: [],
          content: {
            size: entry.responseSize,
            mimeType: entry.responseHeaders['content-type'] || 'application/json',
            text: entry.responseBodyRaw ?? '',
          },
          redirectURL: '',
          headersSize: -1,
          bodySize: entry.responseSize,
        },
        cache: {},
        timings: {
          send: 0,
          wait: entry.duration,
          receive: 0,
        },
      })),
    },
  };
}

export function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
