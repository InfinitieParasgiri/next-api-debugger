import { ApiLogEntry, ConsoleLevel, ConsoleLogEntry, HttpMethod, LogFilterState } from '../types';
import { downloadJson, exportAsHar } from '../core/harExporter';
import { el } from './dom';
import { createRequestList } from './requestList';
import { createRequestDetail } from './requestDetail';
import { createConsoleView } from './consoleView';
import { createInspectorView } from './inspectorView';

const ALL_METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
const CONSOLE_LEVELS: ConsoleLevel[] = ['log', 'info', 'warn', 'error', 'debug'];

type Tab = 'network' | 'console' | 'inspector';

export interface ModalWidget {
  el: HTMLElement;
  open: () => void;
  close: () => void;
  update: (logs: ApiLogEntry[]) => void;
  updateConsole: (entries: ConsoleLogEntry[]) => void;
  isOpen: () => boolean;
}

function searchBox(placeholder: string): { el: HTMLElement; input: HTMLInputElement } {
  const input = el('input', { type: 'text', placeholder }) as HTMLInputElement;
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.setAttribute('viewBox', '0 0 24 24');
  icon.setAttribute('fill', 'none');
  icon.setAttribute('stroke', 'currentColor');
  icon.setAttribute('stroke-width', '2');
  icon.innerHTML = '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>';
  return { el: el('div', { class: 'apd-search' }, [icon, input]), input };
}

export interface ModalOptions {
  inspectorEnabled?: boolean;
  editorProjectRoot?: string;
}

export function createModal(
  onTogglePin: (id: string) => void,
  onClear: () => void,
  onClearConsole: () => void,
  onCloseChange: ((isOpen: boolean) => void) | undefined,
  options: ModalOptions = {}
): ModalWidget {
  const inspectorEnabled = options.inspectorEnabled ?? true;

  let tab: Tab = 'network';
  let filter: LogFilterState = { search: '', status: 'all', methods: [] };
  let consoleSearch = '';
  let consoleLevels: ConsoleLevel[] = [];
  let selectedId: string | null = null;
  let minimized = false;
  let theme: 'light' | 'dark' = 'dark';
  let latestLogs: ApiLogEntry[] = [];
  let latestConsole: ConsoleLogEntry[] = [];
  let visible = false;

  const list = createRequestList(
    (id) => {
      selectedId = id;
      renderNetwork();
    },
    onTogglePin
  );
  const detail = createRequestDetail(onTogglePin);
  const consoleView = createConsoleView();
  const inspectorView = inspectorEnabled
    ? createInspectorView((active) => setMinimized(active), options.editorProjectRoot)
    : null;

  const countEl = el('span', { class: 'apd-header-count' });
  const themeBtn = el('button', { class: 'apd-icon-btn', title: 'Toggle theme', type: 'button' }, ['☾']);

  // --- Network toolbar ---
  const netSearch = searchBox('Filter by URL, endpoint, method or status code...');
  const successChip = el('button', { type: 'button', class: 'apd-chip apd-chip-success' }, ['Success']);
  const failedChip = el('button', { type: 'button', class: 'apd-chip apd-chip-failed' }, ['Failed']);
  const methodChips = ALL_METHODS.map((m) => el('button', { type: 'button', class: 'apd-chip' }, [m]));
  successChip.addEventListener('click', () => {
    filter = { ...filter, status: filter.status === 'success' ? 'all' : 'success' };
    renderNetwork();
  });
  failedChip.addEventListener('click', () => {
    filter = { ...filter, status: filter.status === 'failed' ? 'all' : 'failed' };
    renderNetwork();
  });
  methodChips.forEach((chip, i) => {
    const method = ALL_METHODS[i];
    chip.addEventListener('click', () => {
      filter = {
        ...filter,
        methods: filter.methods.includes(method) ? filter.methods.filter((m) => m !== method) : [...filter.methods, method],
      };
      renderNetwork();
    });
  });
  netSearch.input.addEventListener('input', () => {
    filter = { ...filter, search: netSearch.input.value };
    renderNetwork();
  });
  const networkToolbar = el('div', { class: 'apd-toolbar' }, [netSearch.el, successChip, failedChip, ...methodChips]);
  const networkBody = el('div', { class: 'apd-body' }, [list.el, detail.el]);

  // --- Console toolbar ---
  const consSearch = searchBox('Filter console output...');
  const levelChips = CONSOLE_LEVELS.map((lvl) => el('button', { type: 'button', class: 'apd-chip' }, [lvl]));
  levelChips.forEach((chip, i) => {
    const level = CONSOLE_LEVELS[i];
    chip.addEventListener('click', () => {
      consoleLevels = consoleLevels.includes(level) ? consoleLevels.filter((l) => l !== level) : [...consoleLevels, level];
      renderConsole();
    });
  });
  consSearch.input.addEventListener('input', () => {
    consoleSearch = consSearch.input.value;
    renderConsole();
  });
  const consoleToolbar = el('div', { class: 'apd-toolbar' }, [consSearch.el, ...levelChips]);
  consoleToolbar.style.display = 'none';
  networkToolbar.style.display = '';

  // --- Tabs ---
  const networkTab = el('button', { type: 'button', class: 'apd-tab apd-active' }, ['Network']);
  const consoleTab = el('button', { type: 'button', class: 'apd-tab' }, ['Console']);
  const inspectorTab = el('button', { type: 'button', class: 'apd-tab' }, ['Inspector']);
  const tabButtons = [networkTab, consoleTab, ...(inspectorEnabled ? [inspectorTab] : [])];
  const tabs = el('div', { class: 'apd-tabs' }, tabButtons);
  networkTab.addEventListener('click', () => switchTab('network'));
  consoleTab.addEventListener('click', () => switchTab('console'));
  inspectorTab.addEventListener('click', () => switchTab('inspector'));

  const footer = el('div', { class: 'apd-footer' }, [
    el('span', {}, [
      el('span', { class: 'apd-kbd' }, ['Ctrl']),
      '+',
      el('span', { class: 'apd-kbd' }, ['Shift']),
      '+',
      el('span', { class: 'apd-kbd' }, ['D']),
      ' to toggle · ',
      el('span', { class: 'apd-kbd' }, ['Space']),
      '+',
      el('span', { class: 'apd-kbd' }, ['H']),
      ' to hide',
    ]),
    el('span', { style: 'margin-left:auto' }, ['api-debugger · dev only']),
  ]);

  const closeBtn = el('button', { class: 'apd-icon-btn', title: 'Close', type: 'button' }, ['✕']);
  const minimizeBtn = el('button', { class: 'apd-icon-btn', title: 'Minimize', type: 'button' }, ['—']);
  const clearBtn = el('button', { class: 'apd-icon-btn', title: 'Clear logs', type: 'button' }, ['🗑']);
  const harBtn = el('button', { class: 'apd-icon-btn', title: 'Export HAR', type: 'button' }, ['HAR']);
  const jsonBtn = el('button', { class: 'apd-icon-btn', title: 'Export JSON', type: 'button' }, ['⭳']);

  const header = el('div', { class: 'apd-header' }, [
    el('div', { class: 'apd-header-title' }, [el('span', { class: 'apd-live-dot' }), 'API Debugger']),
    countEl,
    el('div', { class: 'apd-spacer' }),
    themeBtn,
    jsonBtn,
    harBtn,
    clearBtn,
    minimizeBtn,
    closeBtn,
  ]);

  const bodyChildren = [networkBody, consoleView.el, ...(inspectorView ? [inspectorView.el] : [])];
  const body = el('div', { style: 'display:flex;flex-direction:column;flex:1;overflow:hidden' }, bodyChildren);
  consoleView.el.style.display = 'none';
  if (inspectorView) inspectorView.el.style.display = 'none';

  const modal = el('div', { class: 'apd-modal' }, [header, tabs, networkToolbar, consoleToolbar, body, footer]);
  modal.addEventListener('click', (e) => e.stopPropagation());
  const overlay = el('div', { class: 'apd-overlay' }, [modal]);

  overlay.addEventListener('click', () => close());
  closeBtn.addEventListener('click', () => close());

  /**
   * Shared by the minimize button AND the Inspector's own "get out of the
   * way while picking" request — both need to collapse the modal down to
   * just its header without touching the Inspector's own DOM (it must stay
   * mounted, not torn down, or an in-flight element pick would be lost).
   */
  function setMinimized(next: boolean) {
    minimized = next;
    modal.classList.toggle('apd-minimized', minimized);
    overlay.classList.toggle('apd-overlay-passthrough', minimized);
    minimizeBtn.textContent = minimized ? '▢' : '—';
    tabs.style.display = minimized ? 'none' : '';
    networkToolbar.style.display = minimized || tab !== 'network' ? 'none' : '';
    consoleToolbar.style.display = minimized || tab !== 'console' ? 'none' : '';
    body.style.display = minimized ? 'none' : '';
    footer.style.display = minimized ? 'none' : '';
  }

  minimizeBtn.addEventListener('click', () => setMinimized(!minimized));
  clearBtn.addEventListener('click', () => (tab === 'network' ? onClear() : onClearConsole()));
  jsonBtn.addEventListener('click', () => downloadJson(`api-logs-${Date.now()}.json`, latestLogs));
  harBtn.addEventListener('click', () => downloadJson(`api-logs-${Date.now()}.har`, exportAsHar(latestLogs)));
  themeBtn.addEventListener('click', () => {
    theme = theme === 'light' ? 'dark' : 'light';
    themeBtn.textContent = theme === 'light' ? '☀' : '☾';
    const rootEl = overlay.closest('.apd-root') as HTMLElement | null;
    rootEl?.classList.toggle('apd-light', theme === 'light');
  });

  function switchTab(next: Tab) {
    tab = next;
    networkTab.classList.toggle('apd-active', tab === 'network');
    consoleTab.classList.toggle('apd-active', tab === 'console');
    inspectorTab.classList.toggle('apd-active', tab === 'inspector');
    networkToolbar.style.display = tab === 'network' ? '' : 'none';
    consoleToolbar.style.display = tab === 'console' ? '' : 'none';
    networkBody.style.display = tab === 'network' ? '' : 'none';
    consoleView.el.style.display = tab === 'console' ? '' : 'none';
    if (inspectorView) inspectorView.el.style.display = tab === 'inspector' ? 'flex' : 'none';
    clearBtn.title = tab === 'network' ? 'Clear logs' : 'Clear console';
    clearBtn.style.display = tab === 'inspector' ? 'none' : '';
    jsonBtn.style.display = tab === 'network' ? '' : 'none';
    harBtn.style.display = tab === 'network' ? '' : 'none';
    updateHeaderCount();
  }

  function updateHeaderCount() {
    if (tab === 'network') {
      const errorCount = latestLogs.filter((l) => !l.success).length;
      countEl.textContent = `${latestLogs.length} requests${errorCount > 0 ? ` · ${errorCount} failed` : ''}`;
    } else if (tab === 'console') {
      const errorCount = latestConsole.filter((e) => e.level === 'error').length;
      countEl.textContent = `${latestConsole.length} logs${errorCount > 0 ? ` · ${errorCount} errors` : ''}`;
    } else {
      countEl.textContent = 'element picker';
    }
    const netBadge =
      latestLogs.length > 0
        ? el('span', { class: `apd-tab-badge${latestLogs.some((l) => !l.success) ? ' apd-tab-badge-error' : ''}` }, [
            String(latestLogs.length),
          ])
        : null;
    const consBadge =
      latestConsole.length > 0
        ? el('span', { class: `apd-tab-badge${latestConsole.some((e) => e.level === 'error') ? ' apd-tab-badge-error' : ''}` }, [
            String(latestConsole.length),
          ])
        : null;
    networkTab.textContent = 'Network';
    if (netBadge) networkTab.appendChild(netBadge);
    consoleTab.textContent = 'Console';
    if (consBadge) consoleTab.appendChild(consBadge);
    networkTab.classList.toggle('apd-active', tab === 'network');
    consoleTab.classList.toggle('apd-active', tab === 'console');
  }

  function renderNetwork() {
    const search = filter.search.trim().toLowerCase();
    const filtered = latestLogs.filter((log) => {
      if (filter.status === 'success' && !log.success) return false;
      if (filter.status === 'failed' && log.success) return false;
      if (filter.methods.length > 0 && !filter.methods.includes(log.method)) return false;
      if (search) {
        const haystack = `${log.url} ${log.endpoint} ${log.method} ${log.responseStatus ?? ''}`.toLowerCase();
        if (!haystack.includes(search)) return false;
      }
      return true;
    });

    if (!selectedId && filtered.length > 0) selectedId = filtered[0].id;
    const selected = filtered.find((l) => l.id === selectedId) ?? filtered[0] ?? null;
    if (selected) selectedId = selected.id;

    list.render(filtered, selectedId);
    detail.setLog(selected);

    successChip.classList.toggle('apd-active', filter.status === 'success');
    failedChip.classList.toggle('apd-active', filter.status === 'failed');
    methodChips.forEach((chip, i) => chip.classList.toggle('apd-active', filter.methods.includes(ALL_METHODS[i])));

    updateHeaderCount();
  }

  function renderConsole() {
    const search = consoleSearch.trim().toLowerCase();
    const filtered = latestConsole.filter((entry) => {
      if (consoleLevels.length > 0 && !consoleLevels.includes(entry.level)) return false;
      if (search && !entry.preview.toLowerCase().includes(search)) return false;
      return true;
    });
    consoleView.render(filtered);
    levelChips.forEach((chip, i) => chip.classList.toggle('apd-active', consoleLevels.includes(CONSOLE_LEVELS[i])));
    updateHeaderCount();
  }

  function update(logs: ApiLogEntry[]) {
    latestLogs = logs;
    if (visible) renderNetwork();
  }

  function updateConsole(entries: ConsoleLogEntry[]) {
    latestConsole = entries;
    if (visible) renderConsole();
  }

  function open() {
    visible = true;
    overlay.style.display = '';
    renderNetwork();
    renderConsole();
    onCloseChange?.(true);
  }

  function close() {
    visible = false;
    overlay.style.display = 'none';
    onCloseChange?.(false);
  }

  overlay.style.display = 'none';

  return { el: overlay, open, close, update, updateConsole, isOpen: () => visible };
}
