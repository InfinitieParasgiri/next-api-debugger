import { ApiLogEntry, ElementTreeNode } from '../../types';
import { resolveComponentName, resolveSourceSync, BUILD_SOURCE_ATTR } from './resolvers';
import { buildValueIndex, detectDataSource } from './dataSource';

// Safety caps, not expected to matter for a typical card/section — they
// exist so selecting something huge (e.g. accidentally picking <body>)
// degrades gracefully instead of freezing the tab or producing an
// unreadable wall of nodes.
const MAX_DEPTH = 8;
const MAX_CHILDREN_PER_NODE = 40;
const MAX_ANCESTORS = 20;

const CONTENT_ATTRS = ['src', 'href', 'alt', 'title', 'value', 'placeholder'];

function nodeAttributes(el: Element): Record<string, string> {
  const attrs: Record<string, string> = {};
  Array.from(el.attributes).forEach((a) => {
    if (a.name === BUILD_SOURCE_ATTR) return; // already surfaced via `source`
    attrs[a.name] = a.value;
  });
  return attrs;
}

/** Candidate values checked against captured API responses: the element's own direct text (not descendants' — that would be noisy and rarely matches anything), plus a curated set of content-bearing attributes. */
function candidateValues(el: Element): string[] {
  const values: string[] = [];
  const directText = Array.from(el.childNodes)
    .filter((n) => n.nodeType === Node.TEXT_NODE)
    .map((n) => (n.textContent || '').trim())
    .filter(Boolean)
    .join(' ');
  if (directText) values.push(directText);

  for (const attr of CONTENT_ATTRS) {
    const value = el.getAttribute(attr);
    if (value) values.push(value);
  }
  return values;
}

function describeNode(
  el: Element,
  valueIndex: ReturnType<typeof buildValueIndex>,
  children: ElementTreeNode[],
  isLeaf: boolean,
  truncatedChildCount?: number
): ElementTreeNode {
  return {
    tag: el.tagName.toLowerCase(),
    id: el.id || null,
    classes: Array.from(el.classList),
    attributes: nodeAttributes(el),
    componentName: resolveComponentName(el),
    source: resolveSourceSync(el),
    dataSource: detectDataSource(candidateValues(el), valueIndex),
    textPreview: isLeaf ? (el.textContent || '').trim().slice(0, 80) || null : null,
    children,
    truncatedChildCount,
  };
}

function buildDescendants(el: Element, valueIndex: ReturnType<typeof buildValueIndex>, depth: number): ElementTreeNode {
  const allChildren = Array.from(el.children);
  const limitedChildren = allChildren.slice(0, MAX_CHILDREN_PER_NODE);
  const children = depth < MAX_DEPTH ? limitedChildren.map((child) => buildDescendants(child, valueIndex, depth + 1)) : [];
  const truncated = allChildren.length > MAX_CHILDREN_PER_NODE ? allChildren.length - MAX_CHILDREN_PER_NODE : undefined;
  return describeNode(el, valueIndex, children, el.children.length === 0, truncated);
}

/** Walks upward from `el` (exclusive) to (but not including) `<html>`, capped at MAX_ANCESTORS, returned root-first — i.e. `[<body>, <main>, <section>, ...closest parent]`. */
function collectAncestors(el: Element): Element[] {
  const chain: Element[] = [];
  let node: Element | null = el.parentElement;
  while (node && node.tagName.toLowerCase() !== 'html' && chain.length < MAX_ANCESTORS) {
    chain.push(node);
    node = node.parentElement;
  }
  return chain.reverse();
}

/**
 * Builds ONE continuous tree spanning from the outermost relevant ancestor
 * (typically `<body>`) down through every ancestor to the selected element
 * — marked `isSelected: true` — and then its full descendant subtree below
 * that. This mirrors what `tree`-style DOM visualizers show: the whole
 * structural path, not just "what's inside the thing I clicked."
 *
 * Deliberately synchronous throughout (uses `resolveSourceSync`, not the
 * async `resolveSource`) — resolving source locations for a whole tree of
 * potentially many nodes shouldn't mean firing off that many network
 * requests; only the single top-level selected element (handled separately
 * in elementInfo.ts) does the fuller, network-backed resolution.
 */
export function buildElementTree(el: Element, logs: ApiLogEntry[]): ElementTreeNode {
  const valueIndex = buildValueIndex(logs);

  const selected: ElementTreeNode = { ...buildDescendants(el, valueIndex, 0), isSelected: true };

  const ancestors = collectAncestors(el); // root-first
  let root = selected;
  for (let i = ancestors.length - 1; i >= 0; i--) {
    root = { ...describeNode(ancestors[i], valueIndex, [root], false), isAncestorPath: true };
  }
  return root;
}
