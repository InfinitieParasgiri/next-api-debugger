type Attrs = Record<string, string | number | boolean | ((e: any) => void) | undefined | null>;

/** Creates a DOM element with attrs/event-listeners and appends children. Deliberately tiny — no vdom, no diffing, just a shorthand over document.createElement. */
export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs?: Attrs,
  children?: Array<Node | string | null | undefined | false>
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      if (value === undefined || value === null || value === false) continue;
      if (key.startsWith('on') && typeof value === 'function') {
        node.addEventListener(key.slice(2).toLowerCase(), value as EventListener);
      } else if (key === 'class') {
        node.className = String(value);
      } else if (key === 'html') {
        node.innerHTML = String(value);
      } else if (typeof value === 'boolean') {
        if (value) node.setAttribute(key, '');
      } else {
        node.setAttribute(key, String(value));
      }
    }
  }
  if (children) {
    for (const child of children) {
      if (child === null || child === undefined || child === false) continue;
      node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    }
  }
  return node;
}

export function clear(node: Element) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

export function svgIcon(pathData: string, viewBox = '0 0 24 24'): SVGElement {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', viewBox);
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.innerHTML = pathData;
  return svg;
}
