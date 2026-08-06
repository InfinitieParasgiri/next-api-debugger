import { el } from './dom';

const BUTTON_SIZE = 56;
const DRAG_THRESHOLD = 5;
const STORAGE_KEY = 'apd-button-position';

interface Position {
  x: number;
  y: number;
}

function clamp(pos: Position): Position {
  return {
    x: Math.min(Math.max(8, pos.x), window.innerWidth - BUTTON_SIZE - 8),
    y: Math.min(Math.max(8, pos.y), window.innerHeight - BUTTON_SIZE - 8),
  };
}

function loadPosition(): Position {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) return clamp(JSON.parse(saved));
  } catch {
    /* ignore */
  }
  return clamp({ x: window.innerWidth - BUTTON_SIZE - 24, y: window.innerHeight - BUTTON_SIZE - 24 });
}

export interface FloatingButtonWidget {
  el: HTMLButtonElement;
  setCount: (count: number, hasErrors: boolean) => void;
}

export function createFloatingButton(onOpen: () => void, initial?: Position): FloatingButtonWidget {
  const badge = el('span', { class: 'apd-btn-dot' }, ['0']);
  badge.style.display = 'none';

  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.setAttribute('viewBox', '0 0 24 24');
  icon.setAttribute('fill', 'none');
  icon.setAttribute('stroke', 'currentColor');
  icon.setAttribute('stroke-width', '2');
  icon.setAttribute('stroke-linecap', 'round');
  icon.setAttribute('stroke-linejoin', 'round');
  icon.innerHTML = '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>';

  const btn = el(
    'button',
    { type: 'button', class: 'apd-btn', 'aria-label': 'Open API debugger', title: 'API Debugger (drag to move)' },
    [icon, badge]
  );

  let position = initial ? clamp(initial) : loadPosition();
  btn.style.left = `${position.x}px`;
  btn.style.top = `${position.y}px`;

  let dragging = false;
  let moved = false;
  let start = { x: 0, y: 0, posX: 0, posY: 0 };

  btn.addEventListener('pointerdown', (e) => {
    dragging = true;
    moved = false;
    start = { x: e.clientX, y: e.clientY, posX: position.x, posY: position.y };
    btn.setPointerCapture(e.pointerId);
  });

  btn.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) moved = true;
    position = clamp({ x: start.posX + dx, y: start.posY + dy });
    btn.style.left = `${position.x}px`;
    btn.style.top = `${position.y}px`;
  });

  btn.addEventListener('pointerup', () => {
    dragging = false;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(position));
    } catch {
      /* ignore */
    }
  });

  btn.addEventListener('click', () => {
    if (!moved) onOpen();
  });

  window.addEventListener('resize', () => {
    position = clamp(position);
    btn.style.left = `${position.x}px`;
    btn.style.top = `${position.y}px`;
  });

  function setCount(count: number, hasErrors: boolean) {
    badge.textContent = count > 99 ? '99+' : String(count);
    badge.style.display = count > 0 ? '' : 'none';
    badge.classList.toggle('apd-has-errors', hasErrors);
  }

  return { el: btn, setCount };
}
