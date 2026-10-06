import { ApiLogEntry, DataSourceInfo } from '../../types';

interface IndexHit {
  log: ApiLogEntry;
}

const MIN_MATCH_LENGTH = 3;

function walkValues(value: unknown, visit: (v: string) => void) {
  if (value === null || value === undefined) return;
  if (typeof value === 'string') {
    visit(value);
    return;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    visit(String(value));
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((v) => walkValues(v, visit));
    return;
  }
  if (typeof value === 'object') {
    Object.values(value).forEach((v) => walkValues(v, visit));
  }
}

/**
 * Flattens every string/number leaf value out of every captured response
 * body into a lookup table, built once per Inspector pick (not once per
 * element) so checking a whole tree of descendants against it is a cheap
 * Map lookup per node rather than a fresh scan of every response per node.
 */
export function buildValueIndex(logs: ApiLogEntry[]): Map<string, IndexHit> {
  const index = new Map<string, IndexHit>();
  for (const log of logs) {
    walkValues(log.responseBody, (raw) => {
      const value = raw.trim();
      if (value.length < MIN_MATCH_LENGTH) return;
      if (!index.has(value)) index.set(value, { log });
    });
  }
  return index;
}

/**
 * Checks a set of candidate values pulled from one element (its own text,
 * plus attributes like src/href/alt/value) against the index. An exact
 * match against something that actually came back from a captured API
 * response is a real, verifiable signal — not a guess. The absence of a
 * match is intentionally labeled 'static' rather than something stronger:
 * it just means nothing in *this session's captured requests* matched,
 * which is also true for genuinely hardcoded content, content fetched
 * server-side before the page ever reached the browser (Next.js
 * getServerSideProps, Server Components — client-side interceptors never
 * see those requests at all), or a request made through something other
 * than fetch/XHR/axios.
 */
export function detectDataSource(candidates: string[], index: Map<string, IndexHit>): DataSourceInfo {
  for (const raw of candidates) {
    const value = raw.trim();
    if (value.length < MIN_MATCH_LENGTH) continue;
    const hit = index.get(value);
    if (hit) {
      return { kind: 'api', endpoint: hit.log.endpoint, method: hit.log.method, matchedValue: value };
    }
  }
  if (candidates.some((v) => v.trim().length > 0)) {
    return { kind: 'static' };
  }
  return { kind: 'unknown' };
}
