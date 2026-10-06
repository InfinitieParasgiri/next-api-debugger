import { useEffect, useRef } from 'react';

/** Waits for Ctrl (or Cmd) held while the sequence is typed. */
export function useActivationSequence(sequence: string | undefined, onActivate: () => void, enabled: boolean) {
  const progress = useRef('');
  const lastKeyAt = useRef(0);

  useEffect(() => {
    if (!enabled || !sequence || !/^\d+$/.test(sequence)) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.repeat || !(event.ctrlKey || event.metaKey) || event.shiftKey || event.altKey) {
        progress.current = '';
        return;
      }
      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || /^(?:INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) {
        progress.current = '';
        return;
      }

      if (Date.now() - lastKeyAt.current > 3000) progress.current = '';
      lastKeyAt.current = Date.now();
      let next = (progress.current + event.key).slice(-sequence!.length);
      while (next && !sequence!.startsWith(next)) next = next.slice(1);
      if (!next) return;
      event.preventDefault();
      progress.current = next;
      if (next === sequence) {
        progress.current = '';
        onActivate();
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [sequence, onActivate, enabled]);
}
