import { logStore } from './core/logStore';
import { consoleStore } from './core/consoleStore';
import { installFetchInterceptor, uninstallFetchInterceptor } from './core/interceptors/fetchInterceptor';
import { installXhrInterceptor, uninstallXhrInterceptor } from './core/interceptors/xhrInterceptor';
import { installAxiosInterceptor } from './core/interceptors/axiosInterceptor';
import { installConsoleInterceptor, uninstallConsoleInterceptor } from './core/interceptors/consoleInterceptor';
import { mountVanillaUi, VanillaUiHandle } from './vanilla/createUi';

export interface InitOptions {
  /** Force enable/disable. Defaults to true (there's no framework build step to infer NODE_ENV from here, so pass `enabled: false` explicitly to gate it for production yourself). */
  enabled?: boolean;
  /** Max number of logs retained in memory. Defaults to 200. */
  maxLogs?: number;
  /** Max console entries retained in memory. Defaults to 500. */
  maxConsoleEntries?: number;
  /** Initial position of the floating button. */
  initialPosition?: { x: number; y: number };
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

export interface ApiDebuggerInstance {
  /** Removes the UI and reverses all patched globals (fetch/XHR/axios). */
  destroy: () => void;
}

let activeInstance: ApiDebuggerInstance | null = null;

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
export function initApiDebugger(options: InitOptions = {}): ApiDebuggerInstance {
  if (typeof window === 'undefined') {
    return { destroy: () => {} };
  }

  // Calling init() twice (e.g. hot reload in a dev server) shouldn't stack
  // duplicate UIs or double-patch globals — tear down the previous instance
  // first.
  if (activeInstance) {
    activeInstance.destroy();
    activeInstance = null;
  }

  if (options.enabled === false) {
    return { destroy: () => {} };
  }

  logStore.setMaxLogs(options.maxLogs ?? 200);
  consoleStore.setMaxEntries(options.maxConsoleEntries ?? 500);

  installFetchInterceptor({ ignoreUrls: options.ignoreUrls });
  if (options.captureXhr !== false) {
    installXhrInterceptor({ ignoreUrls: options.ignoreUrls });
  }
  if (options.captureConsole !== false) {
    installConsoleInterceptor();
  }
  const uninstallAxios = options.axiosInstance
    ? installAxiosInterceptor(options.axiosInstance, { ignoreUrls: options.ignoreUrls })
    : () => {};

  const ui: VanillaUiHandle = mountVanillaUi({
    initialPosition: options.initialPosition,
    keyboardShortcut: options.keyboardShortcut,
  });

  const instance: ApiDebuggerInstance = {
    destroy() {
      uninstallFetchInterceptor();
      uninstallXhrInterceptor();
      uninstallConsoleInterceptor();
      uninstallAxios();
      ui.destroy();
      if (activeInstance === instance) activeInstance = null;
    },
  };

  activeInstance = instance;
  return instance;
}

// --- Global/script-tag surface -------------------------------------------
// When bundled as an IIFE (see tsup.config.ts, the "standalone" entry with
// format: 'iife', globalName: 'ApiDebugger'), the default export below
// becomes `window.ApiDebugger`, so a plain <script> tag can call
// `ApiDebugger.init()`. ESM/CJS consumers use the named `initApiDebugger`
// export instead — both point at the same function.
// Auto-initializes on load unless the including <script> tag has
// `data-manual-init`, so the absolute minimum setup is a single <script>
// tag with nothing else required.
if (typeof document !== 'undefined') {
  const currentScript = document.currentScript as HTMLScriptElement | null;
  const manual = currentScript?.hasAttribute('data-manual-init');
  if (!manual) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => initApiDebugger());
    } else {
      initApiDebugger();
    }
  }
}

// Explicit self-assignment rather than relying on the bundler's IIFE
// `globalName` mechanism: that wraps the whole module's export namespace
// (`{ default, initApiDebugger }`) and assigns it as the very last step,
// which would clobber any attempt to shape `window.ApiDebugger` from
// inside this same module. Assigning directly here guarantees the exact
// shape `<script>` tag consumers get: `ApiDebugger.init(...)`.
if (typeof window !== 'undefined') {
  (window as any).ApiDebugger = Object.assign((window as any).ApiDebugger || {}, {
    init: initApiDebugger,
  });
}

export default { init: initApiDebugger };
