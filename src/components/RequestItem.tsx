import { ApiLogEntry } from '../types';
import { classNames, formatDuration, formatTimestamp } from '../core/utils';

interface RequestItemProps {
  log: ApiLogEntry;
  selected: boolean;
  onSelect: () => void;
  onTogglePin: () => void;
}

function methodClass(method: string): string {
  const known = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
  return known.includes(method.toUpperCase()) ? `apd-method-${method.toUpperCase()}` : 'apd-method-OTHER';
}

export function RequestItem({ log, selected, onSelect, onTogglePin }: RequestItemProps) {
  return (
    <div
      className={classNames('apd-item', selected && 'apd-selected')}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
    >
      <div className="apd-item-row1">
        <span className={classNames('apd-method', methodClass(log.method))}>{log.method}</span>
        <span className="apd-item-url" title={log.url}>
          {log.endpoint}
        </span>
        <span className={classNames('apd-status-dot', log.success ? 'apd-ok' : 'apd-fail')} />
        {log.pinned && (
          <button
            type="button"
            className="apd-pin-star"
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin();
            }}
            title="Unpin"
            aria-label="Unpin request"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            ★
          </button>
        )}
      </div>
      <div className="apd-item-row2">
        <span>{log.responseStatus ?? (log.error ? 'ERR' : '—')}</span>
        <span>{formatDuration(log.duration)}</span>
        <span>{formatTimestamp(log.timestamp)}</span>
        <span style={{ marginLeft: 'auto', textTransform: 'uppercase' }}>{log.source}</span>
      </div>
    </div>
  );
}
