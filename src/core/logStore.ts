import { ApiLogEntry } from '../types';

type Listener = () => void;

/**
 * Session-only, in-memory log store. No persistence, no backend.
 * Uses a simple pub/sub so React can bind via useSyncExternalStore.
 */
class LogStore {
  private logs: ApiLogEntry[] = [];
  private listeners = new Set<Listener>();
  private maxLogs = 200;
  private snapshot: ApiLogEntry[] = [];

  setMaxLogs(n: number) {
    this.maxLogs = Math.max(1, n);
    this.trim();
  }

  addLog(entry: ApiLogEntry) {
    this.logs = [entry, ...this.logs];
    this.trim();
    this.emit();
  }

  togglePin(id: string) {
    this.logs = this.logs.map((l) => (l.id === id ? { ...l, pinned: !l.pinned } : l));
    this.emit();
  }

  clear() {
    this.logs = [];
    this.emit();
  }

  getLogs = (): ApiLogEntry[] => {
    // Stable reference unless data actually changed, required by useSyncExternalStore.
    this.snapshot = this.logs;
    return this.snapshot;
  };

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  private trim() {
    if (this.logs.length <= this.maxLogs) return;
    const pinned = this.logs.filter((l) => l.pinned);
    const unpinned = this.logs.filter((l) => !l.pinned);
    const keep = unpinned.slice(0, Math.max(0, this.maxLogs - pinned.length));
    const merged = [...pinned, ...keep];
    merged.sort((a, b) => b.timestamp - a.timestamp);
    this.logs = merged;
  }

  private emit() {
    this.listeners.forEach((l) => l());
  }
}

export const logStore = new LogStore();
