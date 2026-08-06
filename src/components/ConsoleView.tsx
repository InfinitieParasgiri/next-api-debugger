import { useState } from 'react';
import { ConsoleLogEntry } from '../types';
import { formatTimestamp } from '../core/utils';

const LEVEL_ICON: Record<string, string> = {
  log: '▸',
  info: 'ℹ',
  warn: '⚠',
  error: '✕',
  debug: '⚙',
};

function ConsoleRow({ entry }: { entry: ConsoleLogEntry }) {
  const [showStack, setShowStack] = useState(false);
  return (
    <div className={`apd-console-item apd-console-${entry.level}`}>
      <span className="apd-console-icon">{LEVEL_ICON[entry.level] ?? '▸'}</span>
      <div className="apd-console-body">
        <div className="apd-console-preview">{entry.preview || '(empty)'}</div>
        <div className="apd-console-meta">
          <span>{formatTimestamp(entry.timestamp)}</span>
          {entry.source !== 'console' && <span>{entry.source}</span>}
          {entry.stack && (
            <button type="button" className="apd-console-toggle-stack" onClick={() => setShowStack((s) => !s)}>
              {showStack ? 'Hide stack trace' : 'Show stack trace'}
            </button>
          )}
        </div>
        {showStack && entry.stack && <div className="apd-console-stack">{entry.stack}</div>}
      </div>
      {entry.count > 1 && <span className="apd-console-count">{entry.count}</span>}
    </div>
  );
}

interface ConsoleViewProps {
  entries: ConsoleLogEntry[];
}

export function ConsoleView({ entries }: ConsoleViewProps) {
  if (entries.length === 0) {
    return (
      <div className="apd-console-list">
        <div className="apd-empty">
          Nothing logged yet.
          <br />
          console.log/warn/error and uncaught errors will show up here.
        </div>
      </div>
    );
  }

  return (
    <div className="apd-console-list">
      {entries.map((entry) => (
        <ConsoleRow key={entry.id} entry={entry} />
      ))}
    </div>
  );
}
