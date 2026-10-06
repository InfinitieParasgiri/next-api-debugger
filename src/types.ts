export type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'
  | string;

export type RequestSource = 'fetch' | 'axios' | 'xhr' | 'server-fetch';

export interface ApiLogEntry {
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

export interface ApiDebuggerProps {
  /** Force enable/disable. Defaults to `process.env.NODE_ENV !== 'production'`. */
  enabled?: boolean;
  /** Max number of logs retained in memory. Defaults to 200. */
  maxLogs?: number;
  /** Initial position of the floating button. */
  initialPosition?: { x: number; y: number };
  /** An axios instance to also intercept (in addition to global fetch). */
  axiosInstance?: unknown;
  /** Color theme. Defaults to 'system'. */
  theme?: 'light' | 'dark' | 'system';
  /** Enable Ctrl/Cmd+Shift+D to toggle the modal. Defaults to true. */
  keyboardShortcut?: boolean;
  /** Optional Ctrl/Cmd + digit sequence that defers capture and UI until typed, e.g. "305305". */
  activationSequence?: string;
  /** URL patterns to exclude from capture. */
  ignoreUrls?: (string | RegExp)[];
  /** Same-origin Next.js route returning this visitor's server request logs. */
  serverLogsUrl?: string;
  /** Enable the Inspector tab (element picker + source mapping). Defaults to true. */
  inspector?: boolean;
  /**
   * Absolute path to your project root on disk, e.g. '/Users/you/project'.
   * Without this, source locations are shown as text only (still copyable);
   * with it, they become clickable `vscode://file/...` links that jump
   * straight to the line in VS Code. There's no way to derive this
   * automatically — the browser only ever sees served paths, never your
   * local filesystem layout.
   */
  editorProjectRoot?: string;
}

export type StatusFilter = 'all' | 'success' | 'failed';

export interface LogFilterState {
  search: string;
  status: StatusFilter;
  methods: HttpMethod[];
}

export type ConsoleLevel = 'log' | 'info' | 'warn' | 'error' | 'debug';
export type ConsoleSource = 'console' | 'window.onerror' | 'unhandledrejection';

export interface ConsoleLogEntry {
  id: string;
  level: ConsoleLevel;
  /** Each console.log(a, b, c) argument, pretty-printed independently — kept
   *  separate (not pre-joined) so the UI can render/highlight each one the
   *  same way the browser devtools console does. */
  parts: string[];
  /** Single-line preview for the collapsed list row. */
  preview: string;
  stack: string | null;
  timestamp: number;
  source: ConsoleSource;
  count: number;
}

// --- Inspector -------------------------------------------------------------

export type SourceOrigin = 'build-plugin' | 'react' | 'vue' | 'stack-trace' | 'plain-html';
/** 'exact' = a build-time debug attribute told us directly (React __source,
 *  Vue __file). 'approximate' = inferred (stack-trace frame, text-search
 *  against the page's own HTML) — right most of the time, but not certain. */
export type SourceConfidence = 'exact' | 'approximate';

export interface SourceLocation {
  file: string;
  line?: number;
  column?: number;
  confidence: SourceConfidence;
  origin: SourceOrigin;
}

export interface DataSourceInfo {
  kind: 'api' | 'static' | 'unknown';
  endpoint?: string;
  method?: string;
  matchedValue?: string;
}

export interface ElementAncestor {
  tag: string;
  id: string | null;
  classes: string[];
}

export interface BoxSides {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface BoxModel {
  margin: BoxSides;
  border: BoxSides;
  padding: BoxSides;
  content: { width: number; height: number };
}

export interface ElementInfo {
  tag: string;
  id: string | null;
  classes: string[];
  attributes: Record<string, string>;
  rect: { x: number; y: number; width: number; height: number };
  box: BoxModel;
  computedStyles: Record<string, string>;
  ancestors: ElementAncestor[];
  childCount: number;
  textPreview: string | null;
  componentName: string | null;
  source: SourceLocation | null;
}

// --- Element tree (descendants) --------------------------------------------

export interface ElementTreeNode {
  tag: string;
  id: string | null;
  classes: string[];
  attributes: Record<string, string>;
  componentName: string | null;
  source: SourceLocation | null;
  dataSource: DataSourceInfo;
  textPreview: string | null;
  children: ElementTreeNode[];
  /** True only for the exact element the user picked — everything else in the tree is an ancestor (above it) or descendant (below it). */
  isSelected?: boolean;
  /** True for every node on the path leading down to the selected element (i.e. every ancestor), so the UI can keep that whole chain expanded by default regardless of depth — only the selected element's own descendants use depth-based auto-collapse. */
  isAncestorPath?: boolean;
  /** Set when this node had more direct children than the safety cap allows — the count of ones NOT included, so the UI can say "+N more" rather than silently dropping them. */
  truncatedChildCount?: number;
}
