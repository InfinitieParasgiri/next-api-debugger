/**
 * Patches document.createElement/createElementNS to remember *where* each
 * element was created — but deliberately does the cheap part now and the
 * expensive part later.
 *
 * Constructing `new Error()` is cheap (no stack unwinding happens yet in
 * V8/SpiderMonkey/JSC — `.stack` is a lazily-computed accessor). Reading
 * `.stack` is what's actually expensive: it walks and formats the whole
 * call stack into a string. So we store the raw Error object in a WeakMap
 * keyed by the element, and only ever touch `.stack` if that specific
 * element is later inspected — which for a page with thousands of DOM
 * nodes and a handful of inspections per session, is a large difference.
 *
 * This only tells us about elements created via JS. Elements that exist
 * because they were written directly in static HTML and parsed by the
 * browser never go through createElement at all — see plainHtml.ts for
 * that case.
 */

const registry = new WeakMap<Node, Error>();

let originalCreateElement: typeof document.createElement | null = null;
let originalCreateElementNS: typeof document.createElementNS | null = null;
let installed = false;

export function installCreationTracker() {
  if (installed || typeof document === 'undefined') return;
  installed = true;

  originalCreateElement = document.createElement.bind(document);
  originalCreateElementNS = document.createElementNS.bind(document);

  document.createElement = function patchedCreateElement(
    this: Document,
    tagName: string,
    options?: ElementCreationOptions
  ) {
    const node = originalCreateElement!(tagName, options as any);
    registry.set(node, new Error());
    return node;
  } as typeof document.createElement;

  document.createElementNS = function patchedCreateElementNS(
    this: Document,
    namespaceURI: string | null,
    qualifiedName: string,
    options?: ElementCreationOptions
  ) {
    const node = originalCreateElementNS!(namespaceURI as any, qualifiedName, options as any);
    registry.set(node, new Error());
    return node;
  } as typeof document.createElementNS;
}

export function uninstallCreationTracker() {
  if (originalCreateElement) document.createElement = originalCreateElement;
  if (originalCreateElementNS) document.createElementNS = originalCreateElementNS;
  installed = false;
  originalCreateElement = null;
  originalCreateElementNS = null;
}

export function getCreationError(el: Node): Error | undefined {
  return registry.get(el);
}
