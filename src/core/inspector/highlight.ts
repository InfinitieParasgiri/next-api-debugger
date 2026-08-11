export interface HighlightBox {
  el: HTMLDivElement;
  show: (rect: DOMRect) => void;
  hide: () => void;
}

/** Creates the highlight overlay used while picking. Deliberately not an outline on the real element — that can shift layout, get clipped by an `overflow:hidden` ancestor, or fight with the element's own styles. A separate `position: fixed` box positioned from `getBoundingClientRect()` avoids all of that. */
export function createHighlightBox(): HighlightBox {
  const box = document.createElement('div');
  box.className = 'apd-inspect-highlight';
  box.style.display = 'none';

  function show(rect: DOMRect) {
    box.style.display = '';
    box.style.left = `${rect.left}px`;
    box.style.top = `${rect.top}px`;
    box.style.width = `${rect.width}px`;
    box.style.height = `${rect.height}px`;
  }

  function hide() {
    box.style.display = 'none';
  }

  return { el: box, show, hide };
}
