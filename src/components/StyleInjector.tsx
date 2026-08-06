import { useEffect } from 'react';
import { css } from '../core/styles';

const STYLE_TAG_ID = 'next-api-debugger-styles';

export function StyleInjector() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById(STYLE_TAG_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_TAG_ID;
    style.textContent = css;
    document.head.appendChild(style);
    // Intentionally not removed on unmount: cheap, idempotent, and avoids a
    // flash of unstyled UI if the debugger remounts (e.g. Fast Refresh).
  }, []);

  return null;
}
