# next-api-debugger

A lightweight, floating API debugger overlay for Next.js apps. Drop it into any
project, and every `fetch` (and, optionally, `axios`) call gets logged in a
draggable panel with cURL export, pretty-printed JSON, filtering, and HAR/JSON
export — all in-memory, all client-side, dev-only by default.

<p>
  <img alt="devtools-style" src="https://img.shields.io/badge/style-devtools--native-22d3ee">
  <img alt="deps" src="https://img.shields.io/badge/runtime%20deps-zero-34d399">
</p>

## Features

- Floating, draggable circular trigger button (position persists per session)
- Captures GET/POST/PUT/PATCH/DELETE/... via `fetch`, and optionally `axios`
- Per-request: URL, method, headers, query params, body, status, response
  headers/body, duration, timestamp, size, success/failure
- One-click **Copy cURL**, **Copy Request**, **Copy Response**
- Search + filters (success / failed / method)
- Expand/collapse sections, syntax-highlighted JSON (no external highlighter dep)
- Export all logs as **JSON** or **HAR**
- Pin favorite requests, dark/light theme, minimize/maximize
- `Ctrl/Cmd+Shift+D` keyboard shortcut
- Capped in-memory log (default 200), session-only — nothing persisted, no backend
- Dev-only by default, one prop to force on/off, tree-shakeable, zero required CSS import

## Install

Clone this repo alongside your Next.js projects, or publish it to your own
npm registry / GitHub Packages and install normally:

```bash
npm install next-api-debugger
# or, straight from a Git repo:
npm install github:your-org/next-api-debugger
```

## Usage

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

### With axios

Pass your axios instance so its requests are captured too (in addition to `fetch`):

```tsx
import axios from 'axios';
import { ApiDebugger } from 'next-api-debugger';

const api = axios.create({ baseURL: '/api' });

<ApiDebugger axiosInstance={api} />
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `enabled` | `boolean` | `NODE_ENV !== 'production'` | Force on/off. |
| `maxLogs` | `number` | `200` | Max requests kept in memory. |
| `initialPosition` | `{ x, y }` | bottom-right | Starting position of the floating button. |
| `axiosInstance` | `AxiosInstance` | — | Also intercept this axios instance. |
| `theme` | `'light' \| 'dark' \| 'system'` | `'dark'` | Initial theme. |
| `keyboardShortcut` | `boolean` | `true` | Enable `Ctrl/Cmd+Shift+D` toggle. |
| `ignoreUrls` | `(string \| RegExp)[]` | — | Skip matching URLs (e.g. analytics beacons). |

## Disabling for production

By default the component renders `null` and never patches `fetch`/`axios`
when `NODE_ENV === 'production'`. To be extra safe (and shave the bundle
entirely), gate the import itself:

```tsx
{process.env.NODE_ENV !== 'production' && <ApiDebugger />}
```

## Advanced / manual usage

The building blocks are exported individually if you want to build your own UI:

```ts
import {
  logStore,
  installFetchInterceptor,
  installAxiosInterceptor,
  generateCurl,
  exportAsHar,
} from 'next-api-debugger';
```

## Architecture

```
src/
├── core/
│   ├── logStore.ts          in-memory pub/sub store (session-only, capped)
│   ├── curlGenerator.ts      builds a copy-pasteable cURL command
│   ├── harExporter.ts        builds a HAR 1.2 document + JSON/HAR download helper
│   ├── utils.ts               formatting, parsing, clipboard helpers
│   └── interceptors/
│       ├── fetchInterceptor.ts   reversible window.fetch patch, clones responses
│       └── axiosInterceptor.ts   reversible axios request/response interceptors
├── hooks/
│   ├── useApiLogs.ts          useSyncExternalStore binding to logStore
│   ├── useDraggable.ts        pointer-based drag + click/drag disambiguation
│   └── useKeyboardShortcut.ts
└── components/
    ├── ApiDebugger.tsx        mount point: installs interceptors, renders button/modal
    ├── FloatingButton.tsx
    ├── DebuggerModal.tsx      toolbar + list + detail layout
    ├── SearchBar.tsx / FilterBar.tsx
    ├── RequestList.tsx / RequestItem.tsx / RequestDetail.tsx
    ├── JsonViewer.tsx          zero-dependency JSON syntax highlighter
    └── styles.ts               injected CSS (no build-step dependency for consumers)
```

**Why no CSS import step?** The styles are injected once via a `<style>` tag
at mount time, scoped under `.apd-root`. This means the package works in any
Next.js app regardless of whether it uses Tailwind, CSS Modules, or plain
CSS — there's nothing to configure.

**Why is the fetch patch reversible?** `installFetchInterceptor` stores the
original `fetch` and `uninstallFetchInterceptor` restores it. `ApiDebugger`
calls uninstall on unmount, so hot-reloading in dev never double-wraps
`fetch`, and if you ever render the component conditionally it cleans up
after itself.

**Why clone the response?** Reading a `Response` body consumes the stream.
The interceptor clones the response before reading, so your application code
always gets an untouched, fully readable response — the debugger never
changes what your app sees.

## Extending

- Add a new capture source (e.g. GraphQL client, WebSocket): write an
  interceptor under `core/interceptors/`, call `logStore.addLog(entry)` with
  an `ApiLogEntry`, and expose an `installXInterceptor` you can call from
  `ApiDebugger` or manually.
- Add a new export format: follow `harExporter.ts` — take `ApiLogEntry[]`,
  return a serializable object, and add a toolbar button in `DebuggerModal`.
- Add a new detail section: add a `<Section>` block in `RequestDetail.tsx`.

## Publishing

```bash
npm run build
npm publish --access public
# or tag/push and let consumers install via `npm install github:you/next-api-debugger`
```

## License

MIT
