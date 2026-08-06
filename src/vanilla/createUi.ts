import { logStore } from '../core/logStore';
import { consoleStore } from '../core/consoleStore';
import { css } from '../core/styles';
import { watchHoldCombo } from '../core/holdCombo';
import { el } from './dom';
import { createFloatingButton } from './floatingButton';
import { createModal } from './modal';

const STYLE_TAG_ID = 'next-api-debugger-styles';

function injectStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_TAG_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_TAG_ID;
  style.textContent = css;
  document.head.appendChild(style);
}

export interface VanillaUiOptions {
  initialPosition?: { x: number; y: number };
  keyboardShortcut?: boolean;
}

export interface VanillaUiHandle {
  destroy: () => void;
}

/** Builds and mounts the floating button + modal, wired to the shared log store. Framework-agnostic: plain DOM only. */
export function mountVanillaUi(options: VanillaUiOptions = {}): VanillaUiHandle {
  injectStyles();

  const root = el('div', { class: 'apd-root' });
  document.body.appendChild(root);

  const button = createFloatingButton(() => {
    button.el.style.display = 'none';
    modal.open();
  }, options.initialPosition);

  const modal = createModal(
    (id) => logStore.togglePin(id),
    () => logStore.clear(),
    () => consoleStore.clear(),
    (isOpen) => {
      button.el.style.display = isOpen ? 'none' : '';
    }
  );

  root.appendChild(button.el);
  root.appendChild(modal.el);

  function refresh() {
    const logs = logStore.getLogs();
    const consoleEntries = consoleStore.getEntries();
    modal.update(logs);
    modal.updateConsole(consoleEntries);
    const hasErrors = logs.some((l) => !l.success) || consoleEntries.some((e) => e.level === 'error');
    button.setCount(logs.length + consoleEntries.length, hasErrors);
  }

  const unsubscribeLogs = logStore.subscribe(refresh);
  const unsubscribeConsole = consoleStore.subscribe(refresh);
  refresh();

  function onKeyDown(e: KeyboardEvent) {
    const ctrlOk = e.ctrlKey || e.metaKey;
    if (ctrlOk && e.shiftKey && e.key.toLowerCase() === 'd') {
      e.preventDefault();
      if (modal.isOpen()) {
        modal.close();
      } else {
        modal.open();
      }
    }
  }

  if (options.keyboardShortcut !== false) {
    window.addEventListener('keydown', onKeyDown);
  }

  // Hold Space+H to fully hide (or reveal) the whole debugger — button and
  // modal both — separate from the modal open/close toggle above.
  let hidden = false;
  const unwatchHideCombo =
    options.keyboardShortcut !== false
      ? watchHoldCombo(['space', 'h'], () => {
          hidden = !hidden;
          if (hidden) modal.close();
          root.style.display = hidden ? 'none' : '';
        })
      : () => {};

  return {
    destroy() {
      unsubscribeLogs();
      unsubscribeConsole();
      window.removeEventListener('keydown', onKeyDown);
      unwatchHideCombo();
      root.remove();
    },
  };
}
