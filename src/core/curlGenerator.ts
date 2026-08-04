import { ApiLogEntry } from '../types';

function shellEscape(value: string): string {
  return `'${value.replace(/'/g, `'\\''`)}'`;
}

/** Builds a ready-to-paste cURL command for a captured request. */
export function generateCurl(entry: ApiLogEntry): string {
  const lines: string[] = [`curl -X ${entry.method} ${shellEscape(entry.url)}`];

  for (const [key, value] of Object.entries(entry.requestHeaders)) {
    // Skip pseudo-headers browsers forbid setting and that add noise.
    if (/^(host|content-length|connection)$/i.test(key)) continue;
    lines.push(`  -H ${shellEscape(`${key}: ${value}`)}`);
  }

  if (entry.requestBodyRaw) {
    lines.push(`  --data-raw ${shellEscape(entry.requestBodyRaw)}`);
  }

  return lines.join(' \\\n');
}
