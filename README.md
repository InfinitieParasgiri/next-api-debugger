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
  for that element. See "How source mapping works" below. Also builds a
  full **Element Tree**: one continuous connector-line view from `<body>`
  down through every ancestor to the selected element (clearly marked) and
  all of its descendants — each node tagged with its own classes, source
  location (when resolvable), and whether its content matches something
  from a **captured API response** vs appears to be static/hardcoded.
  Expandable/collapsible per node.
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

### Next.js Node server requests

The normal debugger captures browser `fetch`, XHR, and axios calls. Requests
made by a Next.js Server Component, Server Function, or Route Handler run in
Node and cannot be seen by the browser interceptor. For a Next.js App Router
project on a persistent Node server, use the optional server entry and a
same-origin log route. This also captures requests made during the first page
render, before the debugger mounts in the browser.
If installing this package from a local checkout, run `npm run build` here
first so the new `dist/server` entry exists in the installed package.

1. Give each browser a private debug session cookie. In Next.js 16, add
   `proxy.ts` at the project root (use `middleware.ts` and export `middleware`
   on older Next.js versions). If you already have a proxy or middleware,
   merge the cookie handling into it.

```ts
// proxy.ts (Next.js 16)
import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const enabled = process.env.NODE_ENV !== 'production' ||
    process.env.NEXT_PUBLIC_API_DEBUGGER_ENABLED === 'true';
  if (!enabled) return NextResponse.next();

  let sessionId = request.cookies.get('apd-session')?.value;
  let created = false;
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    request.cookies.set('apd-session', sessionId);
    created = true;
  }

  const response = NextResponse.next({ request: { headers: request.headers } });
  if (created) {
    response.cookies.set('apd-session', sessionId, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });
  }
  return response;
}
```

2. Expose only the current visitor's logs from a Node Route Handler:

```ts
// app/api/__apd/logs/route.ts
import { cookies } from 'next/headers';
import { getServerLogs } from 'next-api-debugger/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const enabled = process.env.NODE_ENV !== 'production' ||
    process.env.NEXT_PUBLIC_API_DEBUGGER_ENABLED === 'true';
  if (!enabled) return new Response(null, { status: 404 });
  const sessionId = (await cookies()).get('apd-session')?.value;
  return Response.json(getServerLogs(sessionId, { enabled }), {
    headers: { 'Cache-Control': 'private, no-store' },
  });
}
```

3. Wrap the **server-side** `fetch` used for Laravel calls. Keep the same URL,
   options, and response handling that your app already uses:

```ts
// lib/laravel.ts — server-only module
import 'server-only';
import { cookies } from 'next/headers';
import { debugServerFetch } from 'next-api-debugger/server';

export async function laravelFetch(input: RequestInfo | URL, init?: RequestInit) {
  const sessionId = (await cookies()).get('apd-session')?.value;
  const enabled = process.env.NODE_ENV !== 'production' ||
    process.env.NEXT_PUBLIC_API_DEBUGGER_ENABLED === 'true';
  return debugServerFetch(sessionId, input, init, { enabled });
}

// In a Server Component or Route Handler, replace the Laravel fetch call:
// const response = await laravelFetch(new URL('/api/news', process.env.LARAVEL_API_URL));
```

4. Point the browser panel at the route:

```tsx
<ApiDebugger
  enabled={process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_API_DEBUGGER_ENABLED === 'true'}
  serverLogsUrl="/api/__apd/logs"
/>
```

For a PM2 production build, set `NEXT_PUBLIC_API_DEBUGGER_ENABLED=true` at
**build time** and on the Node server, then rebuild and restart Next.js. Leave
it unset to retain the default development-only behavior. Enable this only
where access to the debugger is appropriate for your app.

Server entries are marked `server-fetch` in the Network list. They contain
URL, method, status, and duration; request/response headers and bodies are
deliberately excluded, and query values are redacted. The wrapper returns the
original `Response` and rethrows the original error. Recording is disabled
in production by default. Only calls routed through `debugServerFetch` are captured;
server-side axios calls need their own integration. The in-memory bridge is
per Node process, so a multi-process or serverless deployment needs a shared
store instead.

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
| `serverLogsUrl` | `string` | — | Same-origin Next.js route for this visitor's Node-side request logs. See "Next.js Node server requests" below. |
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
1. **React fiber debug source** (exact file + line) — available in some
   React 18 development builds. React 19 removed `_debugSource`, so this
   cannot provide a dependable path in current Next.js apps.
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
4. **Rendered HTML page** (best-effort page URL and HTML line) — used only
   when the element is not identified as a React element. A page route is
   not presented as a JSX source file or opened in the editor.

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

Because React debug source metadata is not dependable in current Next.js,
and React's render/commit phase split means a DOM-creation stack trace
cannot reach back into your component's own call
frames — **the reliable way to get exact file+line for React
apps is the optional Babel plugin**. It injects a `data-apd-source`
attribute directly onto native JSX elements at build time, so the Inspector
reads it straight off the DOM with no dependency on React's runtime at all.

```js
// babel.config.js (or .babelrc)
module.exports = {
  presets: ['next/babel'], // keep any other presets your app already uses
  plugins: [
    (process.env.NODE_ENV !== 'production' ||
      process.env.NEXT_PUBLIC_API_DEBUGGER_ENABLED === 'true') &&
      'next-api-debugger/babel-plugin',
  ].filter(Boolean),
};
```

Set `editorProjectRoot` to the absolute path of the **Next.js source checkout
on the developer's computer** to make the displayed path clickable in VS Code:

```tsx
<ApiDebugger editorProjectRoot="/Users/you/projects/my-next-app" />
```

If Next.js runs on a remote Node server, use the path on the developer's
computer, not the server's deployment path. Rebuild the Next.js app after
enabling the plugin; already-built HTML cannot gain source attributes later.
For a production build, set `NEXT_PUBLIC_API_DEBUGGER_ENABLED=true` at build
time only when you intentionally want the debugger and these source paths
available there.

The Babel config is opt-in because it changes the app's compile path. With
webpack, Next.js uses Babel instead of SWC for app JavaScript when a Babel
config is present; Next.js 16 Turbopack supports Babel configs automatically.
The plugin skips custom components (`<MyComponent>` — only native tags
like `<div>` get tagged, since a component's props aren't guaranteed to
reach the actual DOM node). The configuration above skips production unless
the debugger is explicitly enabled there.

### Element Tree and API-vs-static detection

Selecting an element also builds a tree of everything underneath it —
tag/component, classes, attributes, and source location per node, exactly
like the top-level element gets, but for the whole subtree at once. Each
node also gets a data-source badge:

- **API** — this element's own text (or a `src`/`href`/`alt`/`value`/
  `placeholder` attribute) exactly matches a value found somewhere inside a
  response body already captured in the **Network tab this session**. The
  badge is hoverable to show which request it matched.
- **STATIC** — no match found in any captured response.
- *(no badge)* — the element has no text or content-bearing attribute of
  its own to check (a pure layout `<div>`, for instance) — there's nothing
  to have classified either way.

**Read "STATIC" as "not verified as API-driven this session," not as a
certainty of hardcoding.** The check can only compare against requests this
session's `fetch`/`XHR`/`axios` interceptors actually saw. Content fetched
server-side before the page reached the browser — Next.js
`getServerSideProps`, `getStaticProps`, React Server Components — is
invisible to a client-side tool by nature; it would show as STATIC even
though it's genuinely API-driven, just not through a request this page's
own JavaScript made. Same for GraphQL clients, WebSocket-delivered data, or
anything else that doesn't go through `fetch`/XHR/axios.

For performance, source resolution inside the tree uses only the
synchronous mechanisms (build-plugin attribute, React fiber, Vue `__file`,
stack trace) — not the plain-HTML network fallback the single selected
element gets — so building a tree for a subtree with many descendants never
fires off more than the one request the top-level element might need.
Depth is capped at 8 levels and 40 children per node as a safety valve
(clearly marked with a "+N more" note if hit) — not expected to matter for
a typical card or section, but keeps something huge like accidentally
selecting `<body>` from freezing the tab.

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
│   │   ├── tree.ts                  descendant tree builder (Element Tree section, see README above)
│   │   ├── dataSource.ts             API-vs-static detection, cross-referenced against captured Network responses
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
