import { ConsoleLogEntry } from '../types';

type Listener = () => void;

/**
 * Session-only, in-memory console log store. Mirrors logStore.ts's shape
 * so both can be consumed the same way, but adds one console-specific
 * behavior: consecutive identical messages collapse into one entry with an
 * incrementing count, the way browser devtools consoles do — otherwise a
 * tight error loop would flood the list and push everything else out.
 */
class ConsoleStore {
  private entries: ConsoleLogEntry[] = [];
  private listeners = new Set<Listener>();
  private maxEntries = 500;

  setMaxEntries(n: number) {
    this.maxEntries = Math.max(1, n);
    this.trim();
  }

  addEntry(entry: ConsoleLogEntry) {
    const last = this.entries[0];
    if (last && last.level === entry.level && last.preview === entry.preview && last.stack === entry.stack) {
      this.entries = [{ ...last, count: last.count + 1, timestamp: entry.timestamp }, ...this.entries.slice(1)];
    } else {
      this.entries = [entry, ...this.entries];
    }
    this.trim();
    this.emit();
  }

  clear() {
    this.entries = [];
    this.emit();
  }

  getEntries = (): ConsoleLogEntry[] => this.entries;

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  private trim() {
    if (this.entries.length > this.maxEntries) {
      this.entries = this.entries.slice(0, this.maxEntries);
    }
  }

  private emit() {
    this.listeners.forEach((l) => l());
  }
}

export const consoleStore = new ConsoleStore();
