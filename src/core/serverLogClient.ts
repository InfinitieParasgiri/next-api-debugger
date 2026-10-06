import { logStore } from './logStore';
import type { ApiLogEntry } from '../types';

/** Poll a same-origin route for Node-side logs, keeping them in the existing UI store. */
export function subscribeServerLogs(url: string): () => void {
  let endpoint: URL;
  try {
    endpoint = new URL(url, window.location.href);
  } catch {
    return () => {};
  }
  if (endpoint.origin !== window.location.origin) return () => {};

  const seen = new Set<string>();
  const controller = new AbortController();
  let polling = false;

  async function poll() {
    if (polling) return;
    polling = true;
    try {
      const response = await fetch(endpoint.toString(), {
        cache: 'no-store',
        credentials: 'same-origin',
        signal: controller.signal,
      });
      if (!response.ok) return;
      const entries: unknown = await response.json();
      if (controller.signal.aborted || !Array.isArray(entries)) return;
      for (const entry of entries.slice().reverse()) {
        if (!entry || typeof entry !== 'object') continue;
        const log = entry as ApiLogEntry;
        if (log.source !== 'server-fetch' || typeof log.id !== 'string' || seen.has(log.id)) continue;
        seen.add(log.id);
        logStore.addLog(log);
      }
      if (seen.size > 1000) {
        const oldest = seen.values();
        while (seen.size > 500) {
          const next = oldest.next();
          if (next.done) break;
          seen.delete(next.value);
        }
      }
    } catch {
      // The panel remains usable if the optional server route is unavailable.
    } finally {
      polling = false;
    }
  }

  void poll();
  const timer = window.setInterval(() => { void poll(); }, 2000);
  return () => {
    window.clearInterval(timer);
    controller.abort();
  };
}
