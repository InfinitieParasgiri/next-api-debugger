import { useEffect, useMemo, useState } from 'react';
import { ApiLogEntry, HttpMethod, LogFilterState } from '../types';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { RequestList } from './RequestList';
import { RequestDetail } from './RequestDetail';
import { exportAsHar, downloadJson } from '../core/harExporter';

interface DebuggerModalProps {
  logs: ApiLogEntry[];
  onClose: () => void;
  onClear: () => void;
  onTogglePin: (id: string) => void;
  theme: 'light' | 'dark' | 'system';
  onToggleTheme: () => void;
}

const ALL_METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

export function DebuggerModal({ logs, onClose, onClear, onTogglePin, theme, onToggleTheme }: DebuggerModalProps) {
  const [filter, setFilter] = useState<LogFilterState>({ search: '', status: 'all', methods: [] });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    if (!selectedId && logs.length > 0) setSelectedId(logs[0].id);
  }, [logs, selectedId]);

  const filtered = useMemo(() => {
    const search = filter.search.trim().toLowerCase();
    return logs.filter((log) => {
      if (filter.status === 'success' && !log.success) return false;
      if (filter.status === 'failed' && log.success) return false;
      if (filter.methods.length > 0 && !filter.methods.includes(log.method)) return false;
      if (search) {
        const haystack = `${log.url} ${log.endpoint} ${log.method} ${log.responseStatus ?? ''}`.toLowerCase();
        if (!haystack.includes(search)) return false;
      }
      return true;
    });
  }, [logs, filter]);

  const selected = filtered.find((l) => l.id === selectedId) ?? filtered[0] ?? null;
  const errorCount = logs.filter((l) => !l.success).length;

  function toggleMethod(method: HttpMethod) {
    setFilter((f) => ({
      ...f,
      methods: f.methods.includes(method) ? f.methods.filter((m) => m !== method) : [...f.methods, method],
    }));
  }

  return (
    <div className="apd-overlay" onClick={onClose}>
      <div className={`apd-modal${minimized ? ' apd-minimized' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="apd-header">
          <div className="apd-header-title">
            <span className="apd-live-dot" />
            API Debugger
          </div>
          <span className="apd-header-count">
            {logs.length} requests{errorCount > 0 ? ` · ${errorCount} failed` : ''}
          </span>
          <div className="apd-spacer" />
          <button className="apd-icon-btn" onClick={onToggleTheme} title="Toggle theme" type="button">
            {theme === 'light' ? '☀' : '☾'}
          </button>
          <button
            className="apd-icon-btn"
            title="Export JSON"
            type="button"
            onClick={() => downloadJson(`api-logs-${Date.now()}.json`, logs)}
          >
            ⭳
          </button>
          <button
            className="apd-icon-btn"
            title="Export HAR"
            type="button"
            onClick={() => downloadJson(`api-logs-${Date.now()}.har`, exportAsHar(logs))}
          >
            HAR
          </button>
          <button className="apd-icon-btn" title="Clear logs" type="button" onClick={onClear}>
            🗑
          </button>
          <button
            className="apd-icon-btn"
            title={minimized ? 'Restore' : 'Minimize'}
            type="button"
            onClick={() => setMinimized((m) => !m)}
          >
            {minimized ? '▢' : '—'}
          </button>
          <button className="apd-icon-btn" title="Close" type="button" onClick={onClose}>
            ✕
          </button>
        </div>

        {!minimized && (
          <>
            <div className="apd-toolbar">
              <SearchBar value={filter.search} onChange={(search) => setFilter((f) => ({ ...f, search }))} />
              <FilterBar
                status={filter.status}
                onStatusChange={(status) => setFilter((f) => ({ ...f, status }))}
                methods={ALL_METHODS}
                activeMethods={filter.methods}
                onToggleMethod={toggleMethod}
              />
            </div>
            <div className="apd-body">
              <RequestList logs={filtered} selectedId={selected?.id ?? null} onSelect={setSelectedId} onTogglePin={onTogglePin} />
              <RequestDetail log={selected} onTogglePin={onTogglePin} />
            </div>
            <div className="apd-footer">
              <span>
                <span className="apd-kbd">Ctrl</span>+<span className="apd-kbd">Shift</span>+<span className="apd-kbd">D</span> to toggle
              </span>
              <span style={{ marginLeft: 'auto' }}>next-api-debugger · dev only</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
