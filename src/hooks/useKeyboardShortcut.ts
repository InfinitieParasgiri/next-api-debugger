import { useEffect } from 'react';

interface Combo {
  ctrl?: boolean;
  shift?: boolean;
  key: string;
}

/** Fires `handler` when the given key combo (e.g. Ctrl+Shift+D) is pressed. */
export function useKeyboardShortcut(combo: Combo, handler: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    function onKeyDown(e: KeyboardEvent) {
      const ctrlOk = !combo.ctrl || e.ctrlKey || e.metaKey;
      const shiftOk = !combo.shift || e.shiftKey;
      if (ctrlOk && shiftOk && e.key.toLowerCase() === combo.key.toLowerCase()) {
        e.preventDefault();
        handler();
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [combo.ctrl, combo.shift, combo.key, handler, enabled]);
}
