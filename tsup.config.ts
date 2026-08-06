import { defineConfig } from 'tsup';

export default defineConfig([
  // React component build (Next.js / React apps): `import { ApiDebugger } from 'next-api-debugger'`
  {
    entry: { index: 'src/index.ts' },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    minify: true,
    external: ['react', 'react-dom', 'axios'],
    banner: {
      js: "'use client';",
    },
  },
  // Framework-agnostic standalone build, importable from any bundler:
  // `import { initApiDebugger } from 'next-api-debugger/standalone'`
  {
    entry: { standalone: 'src/standalone.ts' },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    minify: true,
    external: ['axios'],
    outDir: 'dist',
  },
  // Zero-dependency global script for plain <script> tag use (Vue, Angular,
  // Laravel Blade, plain HTML, or anywhere else). No bundler, no import
  // statement, no build step required on the consuming page.
  // Deliberately no `globalName` here: standalone.ts assigns
  // `window.ApiDebugger` itself as an explicit side effect, which is more
  // reliable than esbuild's globalName wrapper (that exposes the whole
  // module export namespace, not the clean `{ init }` shape we want).
  {
    entry: { 'next-api-debugger': 'src/standalone.ts' },
    format: ['iife'],
    dts: false,
    splitting: false,
    sourcemap: true,
    minify: true,
    outDir: 'dist',
    noExternal: [/.*/],
  },
]);

