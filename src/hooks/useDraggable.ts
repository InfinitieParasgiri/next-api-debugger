import { useCallback, useEffect, useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

const STORAGE_KEY = 'apd-button-position';
const BUTTON_SIZE = 56;
const DRAG_THRESHOLD = 5;

function clamp(pos: Position): Position {
  if (typeof window === 'undefined') return pos;
  return {
    x: Math.min(Math.max(8, pos.x), window.innerWidth - BUTTON_SIZE - 8),
    y: Math.min(Math.max(8, pos.y), window.innerHeight - BUTTON_SIZE - 8),
  };
}

function defaultPosition(): Position {
  if (typeof window === 'undefined') return { x: 24, y: 24 };
  return { x: window.innerWidth - BUTTON_SIZE - 24, y: window.innerHeight - BUTTON_SIZE - 24 };
}

/**
 * Provides pointer-based dragging for the floating button, persists the
 * position for the session, and distinguishes a drag from a plain click.
 */
export function useDraggable(initial?: Position) {
  const [position, setPosition] = useState<Position>(() => {
    if (typeof window === 'undefined') return initial ?? { x: 24, y: 24 };
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) return clamp(JSON.parse(saved));
    } catch {
      /* ignore */
    }
    return clamp(initial ?? defaultPosition());
  });

  const dragging = useRef(false);
  const moved = useRef(false);
  const start = useRef({ pointerX: 0, pointerY: 0, posX: 0, posY: 0 });

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      dragging.current = true;
      moved.current = false;
      start.current = { pointerX: e.clientX, pointerY: e.clientY, posX: position.x, posY: position.y };
      (e.currentTarget as Element).setPointerCapture(e.pointerId);
    },
    [position.x, position.y]
  );

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (!dragging.current) return;
    const dx = e.clientX - start.current.pointerX;
    const dy = e.clientY - start.current.pointerY;
    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) moved.current = true;
    setPosition(clamp({ x: start.current.posX + dx, y: start.current.posY + dy }));
  }, []);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(position));
    } catch {
      /* ignore */
    }
  }, [position]);

  useEffect(() => {
    function onResize() {
      setPosition((p) => clamp(p));
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const wasDragged = useCallback(() => moved.current, []);

  return { position, onPointerDown, onPointerMove, onPointerUp, wasDragged };
}
