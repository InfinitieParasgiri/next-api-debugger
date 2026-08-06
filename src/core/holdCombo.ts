function normalizeKey(key: string): string {
  return key === ' ' ? 'space' : key.toLowerCase();
}

function isEditableTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName?.toLowerCase();
  return tag === 'input' || tag === 'textarea' || tag === 'select' || el.isContentEditable;
}

/**
 * Fires `onTrigger` once when every key in `keys` is simultaneously held
 * down (e.g. ['space', 'h']) — not a sequence, an actual hold. Requiring
 * genuine simultaneous holding (rather than "pressed shortly after one
 * another") is what makes this safe to use with ordinary keys like Space:
 * normal typing or scrolling never holds two keys down together, so it
 * won't false-trigger the way a sequential "space then h" detector could
 * (e.g. typing a sentence with a word starting in "h" right after a space).
 * Also skips entirely while focus is inside an input/textarea/select/
 * contenteditable element, so it never interferes with typing.
 *
 * Returns an unsubscribe function.
 */
export function watchHoldCombo(keys: string[], onTrigger: () => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const target = keys.map(normalizeKey);
  const held = new Set<string>();

  function onKeyDown(e: KeyboardEvent) {
    if (isEditableTarget(e.target)) return;
    const key = normalizeKey(e.key);
    const wasHeld = held.has(key);
    held.add(key);
    if (!wasHeld && target.every((k) => held.has(k))) {
      e.preventDefault();
      onTrigger();
    }
  }
  function onKeyUp(e: KeyboardEvent) {
    held.delete(normalizeKey(e.key));
  }
  function onBlur() {
    held.clear();
  }

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('blur', onBlur);

  return () => {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    window.removeEventListener('blur', onBlur);
  };
}
