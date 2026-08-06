import { consoleStore } from '../consoleStore';
import { ConsoleLevel, ConsoleLogEntry } from '../../types';
import { generateId } from '../utils';

const LEVELS: ConsoleLevel[] = ['log', 'info', 'warn', 'error', 'debug'];

let originals: Partial<Record<ConsoleLevel, (...args: unknown[]) => void>> = {};
let onErrorHandler: ((this: Window, ev: ErrorEvent) => void) | null = null;
let onRejectionHandler: ((ev: PromiseRejectionEvent) => void) | null = null;
let installed = false;

/** Formats a single console argument roughly the way browser devtools display it — not a full object inspector, just enough to search/scan at a glance. */
function formatArg(value: unknown, seen = new WeakSet<object>()): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (value instanceof Error) return `${value.name}: ${value.message}`;
  if (typeof value === 'function') return value.name ? `ƒ ${value.name}()` : 'ƒ ()';
  if (typeof value === 'object') {
    if (seen.has(value)) return '[Circular]';
    seen.add(value);
    try {
      return JSON.stringify(value, (_key, v) => (typeof v === 'bigint' ? v.toString() : v), 2) ?? String(value);
    } catch {
      return Array.isArray(value) ? '[Array]' : '[Object]';
    }
  }
  return String(value);
}

function extractStack(args: unknown[]): string | null {
  for (const arg of args) {
    if (arg instanceof Error && arg.stack) return arg.stack;
  }
  return null;
}

function buildEntry(level: ConsoleLevel, args: unknown[], source: ConsoleLogEntry['source']): ConsoleLogEntry {
  const parts = args.map((a) => formatArg(a));
  return {
    id: generateId(),
    level,
    parts,
    preview: parts.join(' '),
    stack: extractStack(args),
    timestamp: Date.now(),
    source,
    count: 1,
  };
}

export interface ConsoleInterceptorOptions {
  /** Which console methods to capture. Defaults to all of log/info/warn/error/debug. */
  levels?: ConsoleLevel[];
}

/**
 * Patches `console.log/info/warn/error/debug` and adds `window` listeners
 * for uncaught exceptions and unhandled promise rejections — the two
 * classes of error that never go through `console.*` at all, so patching
 * console alone would miss them. Reversible via `uninstallConsoleInterceptor()`.
 */
export function installConsoleInterceptor(options: ConsoleInterceptorOptions = {}) {
  if (installed || typeof window === 'undefined' || typeof console === 'undefined') return;
  installed = true;

  const levels = options.levels ?? LEVELS;
  for (const level of levels) {
    const original = console[level]?.bind(console);
    if (!original) continue;
    originals[level] = original;
    console[level] = (...args: unknown[]) => {
      consoleStore.addEntry(buildEntry(level, args, 'console'));
      original(...args);
    };
  }

  onErrorHandler = (ev: ErrorEvent) => {
    const args = ev.error ? [ev.error] : [ev.message];
    const entry = buildEntry('error', args, 'window.onerror');
    consoleStore.addEntry({
      ...entry,
      preview: entry.preview || `${ev.message} (${ev.filename}:${ev.lineno}:${ev.colno})`,
    });
  };
  window.addEventListener('error', onErrorHandler);

  onRejectionHandler = (ev: PromiseRejectionEvent) => {
    const reason = ev.reason;
    const entry = buildEntry('error', [reason], 'unhandledrejection');
    consoleStore.addEntry({
      ...entry,
      preview: `Unhandled promise rejection: ${entry.preview}`,
    });
  };
  window.addEventListener('unhandledrejection', onRejectionHandler);
}

export function uninstallConsoleInterceptor() {
  if (typeof console !== 'undefined') {
    for (const level of LEVELS) {
      const original = originals[level];
      if (original) console[level] = original;
    }
  }
  if (typeof window !== 'undefined') {
    if (onErrorHandler) window.removeEventListener('error', onErrorHandler);
    if (onRejectionHandler) window.removeEventListener('unhandledrejection', onRejectionHandler);
  }
  originals = {};
  onErrorHandler = null;
  onRejectionHandler = null;
  installed = false;
}
