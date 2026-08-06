import { ConsoleLogEntry } from '../types';
import { formatTimestamp } from '../core/utils';
import { el, clear } from './dom';

const LEVEL_ICON: Record<string, string> = {
  log: '▸',
  info: 'ℹ',
  warn: '⚠',
  error: '✕',
  debug: '⚙',
};

export interface ConsoleViewWidget {
  el: HTMLElement;
  render: (entries: ConsoleLogEntry[]) => void;
}

function consoleRow(entry: ConsoleLogEntry): HTMLElement {
  let showStack = false;

  const stackBox = el('div', { class: 'apd-console-stack' }, [entry.stack ?? '']);
  stackBox.style.display = 'none';

  const meta = el('div', { class: 'apd-console-meta' }, [
    el('span', {}, [formatTimestamp(entry.timestamp)]),
    entry.source !== 'console' ? el('span', {}, [entry.source]) : null,
  ]);

  if (entry.stack) {
    const toggle = el('button', { type: 'button', class: 'apd-console-toggle-stack' }, ['Show stack trace']);
    toggle.addEventListener('click', () => {
      showStack = !showStack;
      toggle.textContent = showStack ? 'Hide stack trace' : 'Show stack trace';
      stackBox.style.display = showStack ? '' : 'none';
    });
    meta.appendChild(toggle);
  }

  const body = el('div', { class: 'apd-console-body' }, [
    el('div', { class: 'apd-console-preview' }, [entry.preview || '(empty)']),
    meta,
    stackBox,
  ]);

  const row = el('div', { class: `apd-console-item apd-console-${entry.level}` }, [
    el('span', { class: 'apd-console-icon' }, [LEVEL_ICON[entry.level] ?? '▸']),
    body,
    entry.count > 1 ? el('span', { class: 'apd-console-count' }, [String(entry.count)]) : null,
  ]);

  return row;
}

export function createConsoleView(): ConsoleViewWidget {
  const root = el('div', { class: 'apd-console-list' });

  function render(entries: ConsoleLogEntry[]) {
    clear(root);
    if (entries.length === 0) {
      root.appendChild(
        el('div', { class: 'apd-empty' }, [
          'Nothing logged yet.',
          el('br'),
          'console.log/warn/error and uncaught errors will show up here.',
        ])
      );
      return;
    }
    for (const entry of entries) {
      root.appendChild(consoleRow(entry));
    }
  }

  return { el: root, render };
}
