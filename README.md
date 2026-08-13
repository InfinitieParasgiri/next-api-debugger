# next-api-debugger

A lightweight, floating API debugger overlay. Works in **any web project** —
plain HTML, Vue, Angular, Laravel Blade, or React/Next.js — with a first-class
React component for React apps and a zero-dependency vanilla build for
everything else. Every `fetch`, `XMLHttpRequest`, and (optionally) `axios`
call gets logged in a draggable panel with cURL export, pretty-printed JSON
with search, filtering, and HAR/JSON export — all in-memory, all client-side,
dev-only by default.

<p>
  <img alt="devtools-style" src="https://img.shields.io/badge/style-devtools--native-22d3ee">
  <img alt="deps" src="https://img.shields.io/badge/runtime%20deps-zero-34d399">
  <img alt="frameworks" src="https://img.shields.io/badge/works%20with-any%20framework-a78bfa">
</p>

## Features

- Floating, draggable circular trigger button (position persists per session)
- Captures GET/POST/PUT/PATCH/DELETE/... via `fetch`, `XMLHttpRequest`
  (jQuery, legacy AJAX, etc.), and optionally `axios` — with automatic
  de-duplication when axios itself is built on `fetch`/XHR under the hood
- Per-request: URL, method, headers, query params, body, status, response
  headers/body, duration, timestamp, size, success/failure
- One-click **Copy cURL** (query params/headers/body match the actual
  request), **Copy Request**, **Copy Response**
- Search + filters (success / failed / method), plus find-in-payload search
  inside each JSON body for large responses
- **Console tab**: captures `console.log/info/warn/error/debug`, uncaught
  exceptions, and unhandled promise rejections — repeated identical messages
  collapse into one row with a count, the way browser devtools do. Filter by
  level, search, expand stack traces.
- **Inspector tab**: devtools-style element picker. Click "Start Inspecting",
  hover to highlight, click to select — shows the box model, computed
  styles, attributes, DOM hierarchy, and (best-effort, in priority order)
  the actual **source file**, line/column, and component name responsible
  for that element. See "How source mapping works" below.
- Expand/collapse sections, syntax-highlighted JSON (no external highlighter dep)
- Export all logs as **JSON** or **HAR**
- Pin favorite requests, dark/light theme, minimize/maximize
- `Ctrl/Cmd+Shift+D` keyboard shortcut to open/close, `Space+H` (held together)
  to fully hide/show the whole debugger
- Capped in-memory log (default 200 requests / 500 console entries),
  session-only — nothing persisted, no backend
- Dev-only by default, one prop/flag to force on/off, zero required CSS import

## Which build do I use?

| Your stack | Use |
|---|---|
| React / Next.js | The `ApiDebugger` React component (`next-api-debugger`) |
| Vue, Angular, or any bundler-based project | `initApiDebugger()` from `next-api-debugger/standalone` |
| Plain HTML, Laravel Blade, or "just add a script tag" | The global build via a `<script>` tag — no build step, no import |

All three share the exact same engine (interceptors, log store, cURL/HAR
generation, JSON highlighting) and the exact same UI, so the experience is
identical regardless of which one you use.

---

## Plain HTML / Laravel Blade / "just add a script tag"

This is the true one-line setup — add this once, anywhere in your page
(e.g. your Blade layout's `<body>`), and it auto-initializes:

```html
<script src="https://unpkg.com/next-api-debugger/dist/next-api-debugger.global.js"></script>
```

That's it — the floating button appears automatically. If you'd rather host
the file yourself, copy `node_modules/next-api-debugger/dist/next-api-debugger.global.js`
into your public assets and reference it the same way.

If you want to control *when* it starts (or pass options), disable
auto-init and call it yourself:

```html
<script src=".../next-api-debugger.global.js" data-manual-init></script>
<script>
  ApiDebugger.init({
    maxLogs: 300,
    ignoreUrls: [/\/analytics\//],
  });
</script>
```

Laravel Blade example (`resources/views/layouts/app.blade.php`):

```blade
<body>
  {{ $slot }}
  @if(app()->environment('local'))
    <script src="{{ asset('vendor/next-api-debugger/next-api-debugger.global.js') }}"></script>
  @endif
</body>
```

## Vue

```bash
npm install next-api-debugger
```

```js
// main.js
import { initApiDebugger } from 'next-api-debugger/standalone';

if (import.meta.env.DEV) {
  initApiDebugger();
}

createApp(App).mount('#app');
```

## Angular

```bash
npm install next-api-debugger
```

```ts
// main.ts
import { initApiDebugger } from 'next-api-debugger/standalone';
import { environment } from './environments/environment';

if (!environment.production) {
  initApiDebugger();
}

platformBrowserDynamic().bootstrapModule(AppModule);
```

Angular's `HttpClient` is captured automatically — it runs on top of `fetch`
or `XMLHttpRequest` depending on configuration, both of which are patched.

## Any other bundler-based project

```js
import { initApiDebugger } from 'next-api-debugger/standalone';
initApiDebugger();
```

## React / Next.js

### App Router (`app/layout.tsx`)

```tsx
import { ApiDebugger } from 'next-api-debugger';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ApiDebugger />
      </body>
    </html>
  );
}
```

`ApiDebugger` uses browser-only APIs, so make sure the file (or the component
itself) is a client component. Easiest: create a tiny wrapper:

```tsx
// components/Debugger.tsx
'use client';
export { ApiDebugger as Debugger } from 'next-api-debugger';
```

### Pages Router (`pages/_app.tsx`)

```tsx
import dynamic from 'next/dynamic';

const ApiDebugger = dynamic(() => import('next-api-debugger').then((m) => m.ApiDebugger), {
  ssr: false,
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ApiDebugger />
    </>
  );
}
```

### With axios (React or standalone)

Pass your axios instance so its requests are captured too:

```tsx
// React
<ApiDebugger axiosInstance={api} />
```

```js
// standalone
initApiDebugger({ axiosInstance: api });
```

---

## Options

Available on both the React `<ApiDebugger />` component and `initApiDebugger()`:

| Option | Type | Default | Description |
|---|---|---|---|
| `enabled` | `boolean` | React: `NODE_ENV !== 'production'`. Standalone: `true` (no build-time env to infer from — pass `false` yourself to gate it) | Force on/off. |
| `maxLogs` | `number` | `200` | Max requests kept in memory. |
| `initialPosition` | `{ x, y }` | bottom-right | Starting position of the floating button. |
| `axiosInstance` | `AxiosInstance` | — | Also intercept this axios instance. |
| `keyboardShortcut` | `boolean` | `true` | Enable `Ctrl/Cmd+Shift+D` (toggle open) and `Space+H` (toggle fully hidden). |
| `ignoreUrls` | `(string \| RegExp)[]` | — | Skip matching URLs (e.g. analytics beacons). |
| `captureXhr`* | `boolean` | `true` | Also capture raw `XMLHttpRequest` calls. |
| `captureConsole`* | `boolean` | `true` | Also capture console output and uncaught errors. |
| `maxConsoleEntries`* | `number` | `500` | Max console entries kept in memory. |
| `inspector` | `boolean` | `true` | Enable the Inspector tab (element picker + source mapping). |
| `editorProjectRoot` | `string` | — | Absolute path to your project on disk (e.g. `/Users/you/project`). Enables click-to-open-in-VS-Code links in the Inspector's source location. Can't be inferred automatically — the browser only ever sees served paths, never your local filesystem layout. |
| `theme`† | `'light' \| 'dark' \| 'system'` | `'dark'` | Initial theme. |

\* standalone-only — the React component always captures XHR by default.
† React component only for now; the standalone UI defaults to dark and can be toggled from the header.

## Disabling for production

**React:** the component renders `null` and never patches anything when
`NODE_ENV === 'production'`, by default.

**Standalone / global script:** there's no build step to infer environment
from, so gate it yourself — e.g. only include the `<script>` tag behind a
server-side environment check (see the Blade example above), or:

```js
initApiDebugger({ enabled: window.location.hostname !== 'production.example.com' });
```

## How source mapping works (Inspector tab)

When you select an element, the Inspector tries to answer "what source file
produced this?" using several mechanisms, in priority order — it stops at
the first one that succeeds, and is honest when none of them do rather than
guessing:

0. **Build-time injected attribute** (exact file + line + column, opt-in) —
   see "Getting accurate source locations" below. This is the only
   mechanism unaffected by the two React-specific problems in #1.
1. **React fiber debug source** (exact file + line) — if the JSX dev
   transform ran. **In practice this is unreliable on current Next.js**:
   Next.js's SWC compiler does not consistently attach React's
   `_debugSource` in dev, even when explicitly configured to — a currently
   open Next.js bug, not something fixable from outside Next.js. Even where
   it IS attached, it only covers elements React's own reconciler created
   directly.
2. **Vue component `__file`** (exact file, rarely a line — a `.vue` file
   maps to one whole component, not a per-element position) — attached by
   `vue-loader` / `@vitejs/plugin-vue` in dev mode; generally reliable,
   unaffected by the Next.js-specific issue above.
3. **Deferred creation-time stack trace** (approximate) — a lightweight
   patch on `document.createElement` remembers *where* each element was
   created (see "Why is element creation tracked?" below). Frames inside
   any `node_modules` package (React, Vue, or anything else) are always
   filtered out — for elements a framework's own renderer created, this
   correctly finds nothing rather than pointing at a vendor bundle chunk
   as if it meant something. It's genuinely useful for plain DOM
   manipulation that doesn't go through a framework at all.
4. **The current page's own URL** (guaranteed file, best-effort line) — the
   last resort. The file is always known with certainty; the line number
   is a best-effort text search against the page's own original HTML.

**Angular** gets component name (best-effort, via the Angular DevTools
global hook when present) but not a source file — no equivalent free
runtime metadata was found; Angular's own "jump to template" tooling relies
on IDE-side language-service integration rather than something readable
from the rendered DOM.

**Component name is always optional** — `null` is a normal, expected result
(plain HTML, Angular without the devtools hook active, or a minified React
production build all have no name to offer), and the Inspector just omits
it rather than showing something misleading.

### Getting accurate source locations (recommended for React/Next.js)

Because of the two React-specific problems above — Next.js's SWC compiler
not reliably attaching debug info, and React's render/commit phase split
meaning a stack trace can never reach back into your component's own call
frames — **the only mechanism that reliably gives exact file+line for React
apps is the optional Babel plugin**. It injects a `data-apd-source`
attribute directly onto native JSX elements at build time, so the Inspector
reads it straight off the DOM with no dependency on React's runtime at all.

```js
// babel.config.js (or .babelrc)
module.exports = {
  presets: [/* your existing presets, e.g. 'next/babel' */],
  plugins: [
    process.env.NODE_ENV !== 'production' && 'next-api-debugger/babel-plugin',
  ].filter(Boolean),
};
```

**Trade-off worth knowing, specific to Next.js:** adding *any* Babel config
file switches Next.js off its SWC compiler for the whole app in dev — a
Next.js behavior, not something this plugin does. You trade some dev-mode
compile/Fast-Refresh speed for exact, guaranteed-accurate source locations.
That's why this is opt-in rather than bundled into the default setup — only
add it if the Inspector's accuracy matters more to you than SWC's speed.
Skipped entirely for custom components (`<MyComponent>` — only native tags
like `<div>` get tagged, since a component's props aren't guaranteed to
reach the actual DOM node) and for production builds if you gate it as
shown above.

## Advanced / manual usage

The building blocks are exported individually if you want to build your own UI:

```ts
import {
  logStore,
  installFetchInterceptor,
  installXhrInterceptor,
  installAxiosInterceptor,
  generateCurl,
  exportAsHar,
} from 'next-api-debugger/standalone'; // or 'next-api-debugger' for the React build
```

## Architecture

```
src/
├── core/                        framework-agnostic engine — no React, no DOM assumptions beyond window/document
│   ├── curlGenerator.ts           builds a copy-pasteable cURL command
│   ├── harExporter.ts             builds a HAR 1.2 document + JSON/HAR download helper
│   ├── jsonHighlight.ts           pure JSON syntax highlighting + search-match logic
│   ├── styles.ts                  the injected CSS, shared by both UIs
│   ├── logStore.ts                network log store — in-memory pub/sub (session-only, capped)
│   ├── consoleStore.ts             console log store — same pub/sub shape, collapses repeats
│   ├── holdCombo.ts                Space+H hide/show, shared by React hook and vanilla UI
│   ├── utils.ts                    formatting, parsing, clipboard helpers
│   ├── inspector/                  element picker engine — pure DOM, no React
│   │   ├── pick.ts                  hover/click/Escape picking, excludes the debugger's own UI
│   │   ├── highlight.ts             the hover highlight overlay box
│   │   ├── elementInfo.ts           box model, computed styles, hierarchy, attributes
│   │   ├── resolvers.ts             priority-ordered source/component-name resolution (see README section above)
│   │   └── creationTracker.ts       deferred, cheap-to-install element-creation stack capture
│   └── interceptors/
│       ├── fetchInterceptor.ts     reversible window.fetch patch, clones responses
│       ├── xhrInterceptor.ts       reversible XMLHttpRequest.prototype patch
│       ├── axiosInterceptor.ts     reversible axios request/response interceptors
│       └── consoleInterceptor.ts   reversible console.* patch + window error/rejection listeners
│
├── vanilla/                     zero-dependency DOM UI — used by the standalone/global builds
│   ├── dom.ts                    tiny element-creation helper
│   ├── jsonViewer.ts              JSON viewer + search, built on core/jsonHighlight
│   ├── requestList.ts / requestDetail.ts / floatingButton.ts / modal.ts
│   └── createUi.ts                 mounts the button + modal, subscribes to logStore
├── standalone.ts                  `initApiDebugger()` — installs interceptors + mounts vanilla UI;
│                                    also self-assigns `window.ApiDebugger` for <script> tag use
│
├── components/                  React UI — used only by the `next-api-debugger` (default) build
│   ├── ApiDebugger.tsx            mount point: installs interceptors, renders button/modal
│   ├── JsonViewer.tsx              same core/jsonHighlight logic, React-flavored
│   └── ... (FloatingButton, DebuggerModal, RequestList, RequestDetail, ...)
└── index.ts                      React entry point

babel-plugin.js                   optional, dev-only — see "Getting accurate
                                    source locations" above. Plain hand-written
                                    CJS, zero dependencies, not bundled by tsup.
```

**Why does this work in any framework?** Everything that actually *does*
something — patching `fetch`/XHR/axios, storing logs, generating cURL/HAR,
highlighting JSON — lives in `core/`, which only touches `window`, `document`,
and standard Web APIs. There is nothing React-specific, Vue-specific, or
Angular-specific about capturing a network request. The two UI layers
(`vanilla/` and `components/`) are just two different ways of rendering the
same `core/` data — one with plain DOM calls, one with React — and they
share the exact same CSS (`core/styles.ts`) and the exact same JSON
highlighting logic (`core/jsonHighlight.ts`) so they look and behave
identically.

**Why no CSS import step?** The styles are injected once via a `<style>` tag
at mount time, scoped under `.apd-root`. This means the package works in any
project regardless of whether it uses Tailwind, CSS Modules, or plain CSS —
there's nothing to configure.

**Why is the fetch/XHR patch reversible?** Each interceptor stores the
original and can restore it (`uninstallFetchInterceptor()`, etc.). Both
`ApiDebugger` (React) and `initApiDebugger()` (standalone) call these on
teardown, so re-initializing (hot reload, calling `init()` twice) never
double-wraps anything.

**Why clone the response?** Reading a `Response` body consumes the stream.
The interceptor clones the response before reading, so your application code
always gets an untouched, fully readable response — the debugger never
changes what your app sees.

**Why doesn't axios get logged twice?** Axios is itself built on top of
either `fetch` or `XMLHttpRequest` in the browser. When `axiosInstance` is
provided, the axios interceptor tags each outgoing request with an internal
header; the fetch/XHR interceptors recognize it, skip logging that request a
second time, and strip the header before anything is actually sent — so it
never reaches the network or risks a CORS preflight.

## Extending

- Add a new capture source (e.g. GraphQL client, WebSocket): write an
  interceptor under `core/interceptors/`, call `logStore.addLog(entry)` with
  an `ApiLogEntry`, and expose an `installXInterceptor` you can call from
  `ApiDebugger`, `initApiDebugger`, or manually.
- Add a new export format: follow `harExporter.ts` — take `ApiLogEntry[]`,
  return a serializable object, and add a toolbar button in both
  `components/DebuggerModal.tsx` and `vanilla/modal.ts`.
- Add a new detail section: add it to both `components/RequestDetail.tsx`
  and `vanilla/requestDetail.ts` (kept in sync manually since one is JSX and
  one is plain DOM — the underlying data and CSS classes are identical).

## Publishing

```bash
npm run build
npm publish --access public
# or tag/push and let consumers install via `npm install github:you/next-api-debugger`
```

The global script (`dist/next-api-debugger.global.js`) is also served
automatically via unpkg/jsdelivr once published:
`https://unpkg.com/next-api-debugger/dist/next-api-debugger.global.js`

## License

MIT
