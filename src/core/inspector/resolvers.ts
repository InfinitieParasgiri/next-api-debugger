import { SourceLocation } from '../../types';
import { getCreationError } from './creationTracker';

/** Attribute name the optional build-time plugin (see babel-plugin.js) injects onto every JSX opening element: `data-apd-source="relative/path.jsx:12:4"`. */
export const BUILD_SOURCE_ATTR = 'data-apd-source';

// --- Build-time injected attribute (most reliable, opt-in) -----------------
// If a project has added the companion Babel plugin, every element that
// came from JSX carries this attribute directly — baked in at build time,
// so reading it doesn't depend on any framework's runtime internals at all.
// This sidesteps two real problems the other resolvers run into for React
// specifically: (1) React 19 removed `_debugSource`, so current Next.js
// builds cannot reliably expose the JSX location through Fiber, and
// (2) React renders in two disconnected phases
// (render, then commit); a stack trace captured when a DOM node is actually
// created is *only ever* inside React's internal commit-phase machinery,
// never inside the component function that wrote the JSX, so no amount of
// smarter frame-parsing can recover the original call site that way. A
// build-time-injected attribute has neither problem, at the cost of an
// explicit opt-in (see README) and a small, dev-only HTML attribute.
function resolveBuildAttributeSource(el: Element): SourceLocation | null {
  const raw = el.getAttribute(BUILD_SOURCE_ATTR);
  if (!raw) return null;
  const match = raw.match(/^(.*):(\d+):(\d+)$/);
  if (!match) return { file: raw, confidence: 'exact', origin: 'build-plugin' };
  return {
    file: match[1],
    line: Number(match[2]),
    column: Number(match[3]),
    confidence: 'exact',
    origin: 'build-plugin',
  };
}

// --- React -------------------------------------------------------------
// React attaches a Fiber node to the real DOM element under a key like
// `__reactFiber$<random>` (React 17+) or `__reactInternalInstance$<random>`
// (React <=16). When the JSX dev-transform ran (true by default for
// Create React App and, historically, Vite+Babel setups — but NOT
// guaranteed for esbuild/oxc-based dev transforms as of newer
// @vitejs/plugin-react versions, see below), each Fiber carries
// `_debugSource = { fileName, lineNumber, columnNumber }`, which is the
// exact mechanism React DevTools itself uses for "open in editor". This is
// feature-detected, never assumed present.

function getReactFiber(el: any): any {
  const key = Object.keys(el).find(
    (k) => k.startsWith('__reactFiber$') || k.startsWith('__reactInternalInstance$')
  );
  return key ? el[key] : null;
}

function resolveReactSource(el: Element): SourceLocation | null {
  let fiber = getReactFiber(el as any);
  while (fiber) {
    const src = fiber._debugSource;
    if (src && src.fileName) {
      return {
        file: src.fileName,
        line: typeof src.lineNumber === 'number' ? src.lineNumber : undefined,
        column: typeof src.columnNumber === 'number' ? src.columnNumber : undefined,
        confidence: 'exact',
        origin: 'react',
      };
    }
    fiber = fiber.return;
  }
  return null;
}

function resolveReactComponentName(el: Element): string | null {
  let fiber = getReactFiber(el as any);
  while (fiber) {
    const t = fiber.type;
    if (typeof t === 'function' && t.name) return t.name;
    if (t && typeof t === 'object' && t.displayName) return t.displayName;
    fiber = fiber.return;
  }
  return null;
}

// --- Vue -----------------------------------------------------------------
// Vue's SFC compiler (vue-loader / @vitejs/plugin-vue) attaches `__file`
// to a component's options object in dev mode, purely for Vue DevTools'
// own "open in editor" feature — same idea as React's _debugSource, but
// file-level rather than line-level: a .vue file maps to one component, so
// there's no natural "line" the way JSX has per-element source positions.
// Only elements at (or nested under) a component root carry this, so we
// walk up the DOM to the nearest ancestor that has it.

function getVueInstance(el: any): { version: 2 | 3; inst: any } | null {
  if (el.__vueParentComponent) return { version: 3, inst: el.__vueParentComponent };
  if (el.__vue__) return { version: 2, inst: el.__vue__ };
  return null;
}

function resolveVueSource(el: Element): SourceLocation | null {
  let node: Element | null = el;
  while (node) {
    const found = getVueInstance(node as any);
    if (found) {
      const file = found.version === 3 ? found.inst.type?.__file : found.inst.$options?.__file;
      if (file) {
        return { file, confidence: 'exact', origin: 'vue' };
      }
    }
    node = node.parentElement;
  }
  return null;
}

function resolveVueComponentName(el: Element): string | null {
  let node: Element | null = el;
  while (node) {
    const found = getVueInstance(node as any);
    if (found) {
      const name =
        found.version === 3
          ? found.inst.type?.__name || found.inst.type?.name
          : found.inst.$options?.name || found.inst.$options?._componentTag;
      if (name) return name;
    }
    node = node.parentElement;
  }
  return null;
}

// --- Angular ---------------------------------------------------------------
// No equivalent free runtime metadata was found for source file mapping
// (see design discussion) — Angular's own "jump to template" tooling
// relies on IDE-side language-service integration, not something readable
// from the rendered DOM. Component *name* is still available, best-effort,
// via the Angular DevTools global hook when present.

function resolveAngularComponentName(el: Element): string | null {
  const ng = (window as any).ng;
  if (!ng?.getComponent) return null;
  try {
    const comp = ng.getComponent(el);
    return comp?.constructor?.name ?? null;
  } catch {
    return null;
  }
}

// --- Stack-trace fallback (deferred) ---------------------------------------
// See creationTracker.ts for why this is cheap to have installed globally.
// The parsed frame is labeled 'approximate': in a dev server environment
// (Vite, webpack-dev-server, Angular CLI) the frame is usually already a
// real, human-readable source path — these tools deliberately emit
// `//# sourceURL=` / eval-based module boundaries specifically so stack
// traces resolve to real filenames without needing a source-map library on
// our end. In a production/minified build the same frame would point at a
// minified bundle location instead — still shown, but clearly the weakest
// signal of the four.

const STACK_FRAME_RE = /(?:\()?(https?:\/\/[^\s)]+|\/[^\s)]+|[A-Za-z]:\\[^\s)]+):(\d+):(\d+)\)?/;

// Anything under node_modules is vendor/framework code, never the app's own
// source — regardless of which specific library it is. This is what makes
// the exclusion general-purpose rather than a maintained list of framework
// names: React, Vue, a state library, a UI kit, all live in node_modules by
// convention, so this one check covers all of them. If a stack is *entirely*
// vendor frames (which is the normal case for any element created by a
// framework's own reconciler/renderer, since that code path never touches
// app code at all) this correctly returns null rather than pointing at,
// say, a react-dom bundle chunk as if it meant something — better to fall
// through to the guaranteed-but-coarser page-path fallback than show a
// technically-real but practically-useless location.
function isVendorFrame(raw: string): boolean {
  return /next-api-debugger|core\/inspector\/|node_modules/.test(raw);
}

function resolveStackTraceSource(el: Element): SourceLocation | null {
  const err = getCreationError(el);
  if (!err?.stack) return null;
  const lines = err.stack.split('\n').slice(1);
  for (const raw of lines) {
    if (isVendorFrame(raw)) continue;
    const match = raw.match(STACK_FRAME_RE);
    if (match) {
      return {
        file: match[1],
        line: Number(match[2]),
        column: Number(match[3]),
        confidence: 'approximate',
        origin: 'stack-trace',
      };
    }
  }
  return null;
}

// --- Rendered HTML fallback (page URL, best-effort HTML line) --------------
// If nothing above matched, the element most likely came straight from the
// browser's own HTML parser rather than any JS framework — in which case
// the current page URL is known, but is not necessarily a source file.
// For a best-effort HTML line number, we fetch the page's
// own original HTML text (cached after the first lookup) and text-search
// for a substring likely unique to this element.

let cachedHtml: string | null | undefined; // undefined = not fetched yet

async function getDocumentHtml(): Promise<string | null> {
  if (cachedHtml !== undefined) return cachedHtml;
  try {
    const res = await fetch(location.href, { cache: 'force-cache' });
    cachedHtml = await res.text();
  } catch {
    cachedHtml = null;
  }
  return cachedHtml;
}

function buildSignature(el: Element): string | null {
  if (el.id) return `id="${el.id}"`;
  for (const attr of ['data-testid', 'name']) {
    const value = el.getAttribute(attr);
    if (value) return `${attr}="${value}"`;
  }
  if (el.className && typeof el.className === 'string') return `class="${el.className}"`;
  return null;
}

async function resolvePlainHtmlSource(el: Element): Promise<SourceLocation> {
  const file = location.pathname || '/';
  const html = await getDocumentHtml();
  if (html) {
    const signature = buildSignature(el);
    if (signature) {
      const idx = html.indexOf(signature);
      if (idx !== -1) {
        const line = html.slice(0, idx).split('\n').length;
        return { file, line, confidence: 'approximate', origin: 'plain-html' };
      }
    }
  }
  return { file, confidence: 'approximate', origin: 'plain-html' };
}

// --- Combined, priority-ordered resolution ----------------------------------

/**
 * The synchronous subset of resolution: everything except the plain-HTML
 * fallback, which needs a `fetch()` of the page's own HTML. Used by the
 * element-tree builder (see tree.ts) so resolving source locations for a
 * whole subtree of potentially many nodes doesn't mean firing off that many
 * network requests — it only ever needs at most one, cached, and only for
 * the single top-level selected element (see resolveSource below).
 */
export function resolveSourceSync(el: Element): SourceLocation | null {
  const buildAttr = resolveBuildAttributeSource(el);
  if (buildAttr) return buildAttr;

  const react = resolveReactSource(el);
  if (react) return react;

  const vue = resolveVueSource(el);
  if (vue) return vue;

  return resolveStackTraceSource(el);
}

/**
 * Resolves a DOM element back to its best-known source location, trying
 * each mechanism in order of confidence and stopping at the first hit:
 *   0. Build-time injected `data-apd-source` attribute (exact file+line,
 *      opt-in via the companion Babel plugin — see README)
 *   1. React fiber debug source (exact file+line, when the JSX dev
 *      transform ran — not guaranteed on every toolchain, see above)
 *   2. Vue component __file (exact file, rarely a line — .vue maps to a
 *      whole component, not a per-element position)
 *   3. Deferred creation-time stack trace (approximate; real filenames in
 *      dev servers, minified locations in production; never vendor code)
 *   4. For non-React elements, the current page URL with a best-effort
 *      HTML line found by text-searching the rendered page
 * Never fabricates a guess beyond what one of these mechanisms actually
 * found — if all five come up empty, the caller gets `null`.
 */
export async function resolveSource(el: Element): Promise<SourceLocation | null> {
  const sync = resolveSourceSync(el);
  if (sync) return sync;

  // Server-rendered React elements are present in the page HTML, but the
  // page URL and its line number are not the JSX file that created them.
  if (getReactFiber(el as any)) return null;

  return resolvePlainHtmlSource(el);
}

/** Best-effort component name — optional by design, `null` is a normal, expected result (plain HTML, Angular without devtools hook, minified React, etc). */
export function resolveComponentName(el: Element): string | null {
  return resolveReactComponentName(el) ?? resolveVueComponentName(el) ?? resolveAngularComponentName(el);
}
