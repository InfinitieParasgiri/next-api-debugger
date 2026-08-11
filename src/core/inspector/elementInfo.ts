import { BoxModel, ElementAncestor, ElementInfo } from '../../types';
import { resolveComponentName, resolveSource } from './resolvers';

/** A curated subset of computed styles, roughly matching what devtools' "Computed" panel leads with — not exhaustive (getComputedStyle has ~300 properties), but the ones actually useful for a quick glance. */
const STYLE_KEYS = [
  'display',
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'width',
  'height',
  'color',
  'background-color',
  'font-family',
  'font-size',
  'font-weight',
  'line-height',
  'text-align',
  'flex-direction',
  'justify-content',
  'align-items',
  'gap',
  'grid-template-columns',
  'grid-template-rows',
  'z-index',
  'opacity',
  'overflow',
  'box-sizing',
  'cursor',
];

function px(value: string): number {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : 0;
}

function getBoxModel(cs: CSSStyleDeclaration): BoxModel {
  return {
    margin: { top: px(cs.marginTop), right: px(cs.marginRight), bottom: px(cs.marginBottom), left: px(cs.marginLeft) },
    border: {
      top: px(cs.borderTopWidth),
      right: px(cs.borderRightWidth),
      bottom: px(cs.borderBottomWidth),
      left: px(cs.borderLeftWidth),
    },
    padding: {
      top: px(cs.paddingTop),
      right: px(cs.paddingRight),
      bottom: px(cs.paddingBottom),
      left: px(cs.paddingLeft),
    },
    content: { width: px(cs.width), height: px(cs.height) },
  };
}

function getAncestors(el: Element): ElementAncestor[] {
  const chain: ElementAncestor[] = [];
  let node: Element | null = el.parentElement;
  while (node && node.tagName.toLowerCase() !== 'html') {
    chain.push({ tag: node.tagName.toLowerCase(), id: node.id || null, classes: Array.from(node.classList) });
    node = node.parentElement;
  }
  return chain;
}

/** Builds a full snapshot of a live element. Async only because the plain-HTML source fallback may need to fetch the page's own HTML — everything else resolves synchronously. */
export async function buildElementInfo(el: Element): Promise<ElementInfo> {
  const cs = getComputedStyle(el);
  const rect = el.getBoundingClientRect();

  const attributes: Record<string, string> = {};
  Array.from(el.attributes).forEach((a) => {
    attributes[a.name] = a.value;
  });

  const computedStyles: Record<string, string> = {};
  STYLE_KEYS.forEach((k) => {
    computedStyles[k] = cs.getPropertyValue(k);
  });

  const isLeaf = el.children.length === 0;
  const textPreview = isLeaf ? (el.textContent || '').trim().slice(0, 120) || null : null;

  return {
    tag: el.tagName.toLowerCase(),
    id: el.id || null,
    classes: Array.from(el.classList),
    attributes,
    rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
    box: getBoxModel(cs),
    computedStyles,
    ancestors: getAncestors(el),
    childCount: el.children.length,
    textPreview,
    componentName: resolveComponentName(el),
    source: await resolveSource(el),
  };
}
