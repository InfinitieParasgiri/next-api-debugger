import { ApiLogEntry } from '../types';
import { RequestItem } from './RequestItem';

interface RequestListProps {
  logs: ApiLogEntry[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onTogglePin: (id: string) => void;
}

export function RequestList({ logs, selectedId, onSelect, onTogglePin }: RequestListProps) {
  if (logs.length === 0) {
    return (
      <div className="apd-list">
        <div className="apd-empty">
          No requests captured yet.
          <br />
          Make an API call and it'll show up here.
        </div>
      </div>
    );
  }

  return (
    <div className="apd-list">
      {logs.map((log) => (
        <RequestItem
          key={log.id}
          log={log}
          selected={log.id === selectedId}
          onSelect={() => onSelect(log.id)}
          onTogglePin={() => onTogglePin(log.id)}
        />
      ))}
    </div>
  );
}
