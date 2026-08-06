interface InitOptions {
    /** Force enable/disable. Defaults to true (there's no framework build step to infer NODE_ENV from here, so pass `enabled: false` explicitly to gate it for production yourself). */
    enabled?: boolean;
    /** Max number of logs retained in memory. Defaults to 200. */
    maxLogs?: number;
    /** Max console entries retained in memory. Defaults to 500. */
    maxConsoleEntries?: number;
    /** Initial position of the floating button. */
    initialPosition?: {
        x: number;
        y: number;
    };
    /** An axios instance to also intercept (in addition to fetch/XHR). */
    axiosInstance?: unknown;
    /** Enable Ctrl/Cmd+Shift+D to toggle the modal. Defaults to true. */
    keyboardShortcut?: boolean;
    /** URL patterns to exclude from capture. */
    ignoreUrls?: (string | RegExp)[];
    /** Also capture requests made via XMLHttpRequest (jQuery, legacy AJAX, etc). Defaults to true. */
    captureXhr?: boolean;
    /** Also capture console.log/warn/error, uncaught errors, and unhandled promise rejections. Defaults to true. */
    captureConsole?: boolean;
}
interface ApiDebuggerInstance {
    /** Removes the UI and reverses all patched globals (fetch/XHR/axios). */
    destroy: () => void;
}
/**
 * One-line, framework-agnostic setup. Works the same in plain HTML, Vue,
 * Angular, Laravel Blade, or any other frontend — it only touches
 * `window`/`document`/`fetch`/`XMLHttpRequest`, none of which are
 * React/Next.js-specific.
 *
 *   import { initApiDebugger } from 'next-api-debugger/standalone';
 *   initApiDebugger();
 *
 * Or via a plain <script> tag, where it's exposed as `window.ApiDebugger`:
 *
 *   <script src=".../next-api-debugger.global.js"></script>
 *   <script>ApiDebugger.init();</script>
 */
declare function initApiDebugger(options?: InitOptions): ApiDebuggerInstance;
declare const _default: {
    init: typeof initApiDebugger;
};

export { type ApiDebuggerInstance, type InitOptions, _default as default, initApiDebugger };
