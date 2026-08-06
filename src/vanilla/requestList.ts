import { ApiLogEntry } from '../types';
import { formatDuration, formatTimestamp } from '../core/utils';
import { el, clear } from './dom';

function methodClass(method: string): string {
  const known = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
  return known.includes(method.toUpperCase()) ? `apd-method-${method.toUpperCase()}` : 'apd-method-OTHER';
}

export interface RequestListWidget {
  el: HTMLElement;
  render: (logs: ApiLogEntry[], selectedId: string | null) => void;
}

export function createRequestList(onSelect: (id: string) => void, onTogglePin: (id: string) => void): RequestListWidget {
  const root = el('div', { class: 'apd-list' });

  function render(logs: ApiLogEntry[], selectedId: string | null) {
    clear(root);

    if (logs.length === 0) {
      root.appendChild(
        el('div', { class: 'apd-empty' }, ["No requests captured yet.", el('br'), "Make an API call and it'll show up here."])
      );
      return;
    }

    for (const log of logs) {
      const selected = log.id === selectedId;
      const row1 = el('div', { class: 'apd-item-row1' }, [
        el('span', { class: `apd-method ${methodClass(log.method)}` }, [log.method]),
        el('span', { class: 'apd-item-url', title: log.url }, [log.endpoint]),
        el('span', { class: `apd-status-dot ${log.success ? 'apd-ok' : 'apd-fail'}` }),
      ]);
      if (log.pinned) {
        const star = el(
          'button',
          {
            class: 'apd-pin-star',
            style: 'background:none;border:none;cursor:pointer;padding:0',
            title: 'Unpin',
            'aria-label': 'Unpin request',
          },
          ['★']
        );
        star.addEventListener('click', (e) => {
          e.stopPropagation();
          onTogglePin(log.id);
        });
        row1.appendChild(star);
      }

      const row2 = el('div', { class: 'apd-item-row2' }, [
        el('span', {}, [String(log.responseStatus ?? (log.error ? 'ERR' : '—'))]),
        el('span', {}, [formatDuration(log.duration)]),
        el('span', {}, [formatTimestamp(log.timestamp)]),
        el('span', { style: 'margin-left:auto;text-transform:uppercase' }, [log.source]),
      ]);

      const item = el('div', { class: `apd-item${selected ? ' apd-selected' : ''}`, role: 'button', tabindex: '0' }, [
        row1,
        row2,
      ]);
      item.addEventListener('click', () => onSelect(log.id));
      item.addEventListener('keydown', (e) => {
        if ((e as KeyboardEvent).key === 'Enter') onSelect(log.id);
      });
      root.appendChild(item);
    }
  }

  return { el: root, render };
}
