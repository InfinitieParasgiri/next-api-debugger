export interface PickController {
  cancel: () => void;
}

function isInsideDebugger(el: Element | null): boolean {
  return !!el?.closest('.apd-root');
}

/**
 * Starts devtools-style element picking: tracks hover via `onHover`, and on
 * click, selects the element under the cursor, prevents that click from
 * doing anything else on the page (navigation, form submit, app handlers),
 * and calls `onPick`. Escape cancels without selecting.
 *
 * Listens in the capture phase specifically so we see (and can block)
 * clicks before the page's own handlers do — otherwise clicking a link
 * while picking would navigate away instead of selecting it.
 *
 * Elements inside the debugger's own UI (`.apd-root`) are excluded, so you
 * can't accidentally end up inspecting the debugger's own button or panel.
 */
export function startPicking(
  onPick: (el: Element) => void,
  onHover?: (el: Element | null) => void,
  onCancel?: () => void
): PickController {
  let active = true;

  function elementAt(e: MouseEvent): Element | null {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    return isInsideDebugger(el) ? null : el;
  }

  function onMove(e: MouseEvent) {
    if (!active) return;
    onHover?.(elementAt(e));
  }

  function onClick(e: MouseEvent) {
    if (!active) return;
    const el = elementAt(e);
    if (!el) return; // let clicks on the debugger's own UI behave normally
    e.preventDefault();
    e.stopPropagation();
    stop();
    onPick(el);
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      stop();
      onCancel?.();
    }
  }

  function stop() {
    active = false;
    window.removeEventListener('mousemove', onMove, true);
    window.removeEventListener('click', onClick, true);
    window.removeEventListener('keydown', onKeyDown, true);
  }

  window.addEventListener('mousemove', onMove, true);
  window.addEventListener('click', onClick, true);
  window.addEventListener('keydown', onKeyDown, true);

  return {
    cancel: () => {
      stop();
      onCancel?.();
    },
  };
}
