import { useDraggable } from '../hooks/useDraggable';
import { classNames } from '../core/utils';

interface FloatingButtonProps {
  count: number;
  hasErrors: boolean;
  onOpen: () => void;
  initialPosition?: { x: number; y: number };
}

export function FloatingButton({ count, hasErrors, onOpen, initialPosition }: FloatingButtonProps) {
  const { position, onPointerDown, onPointerMove, onPointerUp, wasDragged } = useDraggable(initialPosition);

  return (
    <button
      type="button"
      className="apd-btn"
      style={{ left: position.x, top: position.y }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onClick={() => {
        if (!wasDragged()) onOpen();
      }}
      aria-label="Open API debugger"
      title="API Debugger (drag to move)"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
      {count > 0 && (
        <span className={classNames('apd-btn-dot', hasErrors && 'apd-has-errors')}>
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}
