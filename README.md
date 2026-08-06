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
│   ├── utils.ts                    formatting, parsing, clipboard helpers
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
