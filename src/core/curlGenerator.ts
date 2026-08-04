import { ApiLogEntry } from '../types';

function shellEscape(value: string): string {
  return `'${value.replace(/'/g, `'\\''`)}'`;
}

function looksLikeJson(raw: string): boolean {
  const trimmed = raw.trim();
  if (!trimmed) return false;
  if (!(trimmed.startsWith('{') || trimmed.startsWith('['))) return false;
  try {
    JSON.parse(trimmed);
    return true;
  } catch {
    return false;
  }
}

/** Builds a ready-to-paste cURL command for a captured request. */
export function generateCurl(entry: ApiLogEntry): string {
  const lines: string[] = [`curl -X ${entry.method} ${shellEscape(entry.url)}`];

  const hasContentType = Object.keys(entry.requestHeaders).some((k) => k.toLowerCase() === 'content-type');

  for (const [key, value] of Object.entries(entry.requestHeaders)) {
    // Skip pseudo-headers browsers forbid setting and that add noise.
    if (/^(host|content-length|connection)$/i.test(key)) continue;
    lines.push(`  -H ${shellEscape(`${key}: ${value}`)}`);
  }

  if (entry.requestBodyRaw) {
    // Guard against a missing Content-Type causing the curl command to send
    // a JSON body as the wrong content type on replay.
    if (!hasContentType && looksLikeJson(entry.requestBodyRaw)) {
      lines.push(`  -H ${shellEscape('Content-Type: application/json')}`);
    }
    lines.push(`  --data-raw ${shellEscape(entry.requestBodyRaw)}`);
  }

  return lines.join(' \\\n');
}

