import { useEffect, useMemo, useState } from 'react';
import { ApiLogEntry, ConsoleLevel, ConsoleLogEntry, HttpMethod, LogFilterState } from '../types';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { RequestList } from './RequestList';
import { RequestDetail } from './RequestDetail';
import { ConsoleView } from './ConsoleView';
import { InspectorView } from './InspectorView';
import { exportAsHar, downloadJson } from '../core/harExporter';
import { classNames } from '../core/utils';

interface DebuggerModalProps {
  logs: ApiLogEntry[];
  consoleEntries: ConsoleLogEntry[];
  onClose: () => void;
  onClear: () => void;
  onClearConsole: () => void;
  onTogglePin: (id: string) => void;
  theme: 'light' | 'dark' | 'system';
  onToggleTheme: () => void;
  inspectorEnabled: boolean;
  editorProjectRoot?: string;
}

const ALL_METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
const CONSOLE_LEVELS: ConsoleLevel[] = ['log', 'info', 'warn', 'error', 'debug'];

type Tab = 'network' | 'console' | 'inspector';

export function DebuggerModal({
  logs,
  consoleEntries,
  onClose,
  onClear,
  onClearConsole,
  onTogglePin,
  theme,
  onToggleTheme,
  inspectorEnabled,
  editorProjectRoot,
}: DebuggerModalProps) {
  const [tab, setTab] = useState<Tab>('network');
  const [filter, setFilter] = useState<LogFilterState>({ search: '', status: 'all', methods: [] });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [minimized, setMinimized] = useState(false);
  const [consoleSearch, setConsoleSearch] = useState('');
  const [consoleLevels, setConsoleLevels] = useState<ConsoleLevel[]>([]);

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

  const filteredConsole = useMemo(() => {
    const search = consoleSearch.trim().toLowerCase();
    return consoleEntries.filter((entry) => {
      if (consoleLevels.length > 0 && !consoleLevels.includes(entry.level)) return false;
      if (search && !entry.preview.toLowerCase().includes(search)) return false;
      return true;
    });
  }, [consoleEntries, consoleSearch, consoleLevels]);

  const selected = filtered.find((l) => l.id === selectedId) ?? filtered[0] ?? null;
  const errorCount = logs.filter((l) => !l.success).length;
  const consoleErrorCount = consoleEntries.filter((e) => e.level === 'error').length;

  function toggleMethod(method: HttpMethod) {
    setFilter((f) => ({
      ...f,
      methods: f.methods.includes(method) ? f.methods.filter((m) => m !== method) : [...f.methods, method],
    }));
  }

  function toggleConsoleLevel(level: ConsoleLevel) {
    setConsoleLevels((l) => (l.includes(level) ? l.filter((x) => x !== level) : [...l, level]));
  }

  const headerCount =
    tab === 'network'
      ? `${logs.length} requests${errorCount > 0 ? ` · ${errorCount} failed` : ''}`
      : tab === 'console'
        ? `${consoleEntries.length} logs${consoleErrorCount > 0 ? ` · ${consoleErrorCount} errors` : ''}`
        : 'element picker';

  return (
    <div className={classNames('apd-overlay', minimized && 'apd-overlay-passthrough')} onClick={onClose}>
      <div className={`apd-modal${minimized ? ' apd-minimized' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="apd-header">
          <div className="apd-header-title">
            <span className="apd-live-dot" />
            API Debugger
          </div>
          <span className="apd-header-count">{headerCount}</span>
          <div className="apd-spacer" />
          <button className="apd-icon-btn" onClick={onToggleTheme} title="Toggle theme" type="button">
            {theme === 'light' ? '☀' : '☾'}
          </button>
          {tab === 'network' && (
            <>
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
            </>
          )}
          {tab !== 'inspector' && (
            <button
              className="apd-icon-btn"
              title={tab === 'network' ? 'Clear logs' : 'Clear console'}
              type="button"
              onClick={tab === 'network' ? onClear : onClearConsole}
            >
              🗑
            </button>
          )}
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
          <div className="apd-tabs">
            <button
              type="button"
              className={classNames('apd-tab', tab === 'network' && 'apd-active')}
              onClick={() => setTab('network')}
            >
              Network
              {logs.length > 0 && (
                <span className={classNames('apd-tab-badge', errorCount > 0 && 'apd-tab-badge-error')}>
                  {logs.length}
                </span>
              )}
            </button>
            <button
              type="button"
              className={classNames('apd-tab', tab === 'console' && 'apd-active')}
              onClick={() => setTab('console')}
            >
              Console
              {consoleEntries.length > 0 && (
                <span className={classNames('apd-tab-badge', consoleErrorCount > 0 && 'apd-tab-badge-error')}>
                  {consoleEntries.length}
                </span>
              )}
            </button>
            {inspectorEnabled && (
              <button
                type="button"
                className={classNames('apd-tab', tab === 'inspector' && 'apd-active')}
                onClick={() => setTab('inspector')}
              >
                Inspector
              </button>
            )}
          </div>
        )}

        {!minimized && tab === 'network' && (
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
              <RequestList
                logs={filtered}
                selectedId={selected?.id ?? null}
                onSelect={setSelectedId}
                onTogglePin={onTogglePin}
              />
              <RequestDetail log={selected} onTogglePin={onTogglePin} />
            </div>
          </>
        )}

        {!minimized && tab === 'console' && (
          <>
            <div className="apd-toolbar">
              <SearchBar value={consoleSearch} onChange={setConsoleSearch} />
              {CONSOLE_LEVELS.map((level) => (
                <button
                  key={level}
                  type="button"
                  className={classNames('apd-chip', consoleLevels.includes(level) && 'apd-active')}
                  onClick={() => toggleConsoleLevel(level)}
                >
                  {level}
                </button>
              ))}
            </div>
            <ConsoleView entries={filteredConsole} />
          </>
        )}

        {/*
          Inspector stays mounted for the whole life of the modal (once
          enabled) rather than being unmounted whenever the modal minimizes
          or another tab is active — it minimizes itself (via
          onInspectingChange) while actively picking, so unmounting it on
          that same transition would destroy an in-flight pick. Visibility
          is CSS-only; nothing here tears down its state.
        */}
        {inspectorEnabled && (
          <div
            style={{
              display: !minimized && tab === 'inspector' ? 'flex' : 'none',
              flexDirection: 'column',
              flex: 1,
              overflow: 'hidden',
            }}
          >
            <InspectorView onInspectingChange={setMinimized} editorProjectRoot={editorProjectRoot} />
          </div>
        )}

        {!minimized && (
          <div className="apd-footer">
            <span>
              <span className="apd-kbd">Ctrl</span>+<span className="apd-kbd">Shift</span>+<span className="apd-kbd">D</span> to
              toggle · <span className="apd-kbd">Space</span>+<span className="apd-kbd">H</span> to hide
            </span>
            <span style={{ marginLeft: 'auto' }}>next-api-debugger · dev only</span>
          </div>
        )}
      </div>
    </div>
  );
}
