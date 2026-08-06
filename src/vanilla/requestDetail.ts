import { ApiLogEntry } from '../types';
import { generateCurl } from '../core/curlGenerator';
import { copyToClipboard, formatBytes, formatDuration, formatTimestamp, safeStringify } from '../core/utils';
import { el, clear } from './dom';
import { createJsonViewer } from './jsonViewer';

function copyButton(label: string, getText: () => string): HTMLButtonElement {
  const btn = el('button', { type: 'button', class: 'apd-action-btn' }, [label]);
  btn.addEventListener('click', async () => {
    const ok = await copyToClipboard(getText());
    if (ok) {
      const original = label;
      btn.textContent = 'Copied';
      btn.classList.add('apd-copied');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('apd-copied');
      }, 1200);
    }
  });
  return btn;
}

function section(title: string, count: number | undefined, defaultOpen: boolean, body: HTMLElement): HTMLElement {
  let open = defaultOpen;
  const toggleIcon = el('span', {}, [open ? '−' : '+']);
  const label = `${title}${typeof count === 'number' ? ` (${count})` : ''}`;
  const header = el('div', { class: 'apd-section-header' }, [el('span', {}, [label]), toggleIcon]);
  const bodyWrap = el('div', { class: 'apd-section-body' }, [body]);
  bodyWrap.style.display = open ? '' : 'none';
  header.addEventListener('click', () => {
    open = !open;
    bodyWrap.style.display = open ? '' : 'none';
    toggleIcon.textContent = open ? '−' : '+';
  });
  return el('div', { class: 'apd-section' }, [header, bodyWrap]);
}

function keyValueTable(data: Record<string, string>): HTMLElement {
  const entries = Object.entries(data);
  if (entries.length === 0) return el('div', { class: 'apd-empty-body' }, ['None']);
  const grid = el('div', { class: 'apd-kv' });
  entries.forEach(([k, v]) => {
    grid.appendChild(el('div', { class: 'apd-kv-key' }, [k]));
    grid.appendChild(el('div', { class: 'apd-kv-val' }, [v]));
  });
  return grid;
}

export interface RequestDetailWidget {
  el: HTMLElement;
  setLog: (log: ApiLogEntry | null) => void;
}

export function createRequestDetail(onTogglePin: (id: string) => void): RequestDetailWidget {
  const root = el('div', { class: 'apd-detail' });

  function render(log: ApiLogEntry | null) {
    clear(root);

    if (!log) {
      root.appendChild(el('div', { class: 'apd-detail-empty' }, ['Select a request to see full details']));
      return;
    }

    const curl = generateCurl(log);
    const requestJson = safeStringify(log.requestBody) ?? log.requestBodyRaw ?? '';
    const responseJson = safeStringify(log.responseBody) ?? log.responseBodyRaw ?? '';

    const pinBtn = el('button', { type: 'button', class: 'apd-action-btn', title: log.pinned ? 'Unpin' : 'Pin this request' }, [
      log.pinned ? '★ Pinned' : '☆ Pin',
    ]);
    pinBtn.addEventListener('click', () => onTogglePin(log.id));

    root.appendChild(
      el('div', { class: 'apd-detail-header' }, [
        el('div', { class: 'apd-detail-url' }, [el('strong', {}, [log.method]), ` ${log.url}`]),
        pinBtn,
      ])
    );

    const metaGrid = el('div', { class: 'apd-meta-grid' });
    const metaItem = (label: string, value: string, color?: string) =>
      el('div', {}, [
        el('div', { class: 'apd-meta-label' }, [label]),
        el('div', { class: 'apd-meta-value', style: color ? `color:${color}` : undefined }, [value]),
      ]);
    metaGrid.appendChild(
      metaItem(
        'Status',
        `${log.responseStatus ?? 'Failed'} ${log.responseStatusText}`,
        log.success ? 'var(--apd-success)' : 'var(--apd-error)'
      )
    );
    metaGrid.appendChild(metaItem('Duration', formatDuration(log.duration)));
    metaGrid.appendChild(metaItem('Time', formatTimestamp(log.timestamp)));
    metaGrid.appendChild(metaItem('Source', log.source));
    metaGrid.appendChild(metaItem('Req. size', formatBytes(log.requestSize)));
    metaGrid.appendChild(metaItem('Res. size', formatBytes(log.responseSize)));
    root.appendChild(metaGrid);

    if (log.error) {
      root.appendChild(
        el('div', { class: 'apd-section', style: 'border-color: var(--apd-error)' }, [
          el('div', { class: 'apd-section-header', style: 'color: var(--apd-error)' }, ['Error']),
          el('div', { class: 'apd-section-body' }, [log.error]),
        ])
      );
    }

    root.appendChild(
      el('div', { class: 'apd-actions' }, [
        copyButton('Copy cURL', () => curl),
        copyButton('Copy Request', () => requestJson),
        copyButton('Copy Response', () => responseJson),
      ])
    );

    root.appendChild(section('cURL', undefined, true, createJsonViewer(curl, null, false).el));
    root.appendChild(section('Query Params', Object.keys(log.queryParams).length, false, keyValueTable(log.queryParams)));
    root.appendChild(
      section('Request Headers', Object.keys(log.requestHeaders).length, false, keyValueTable(log.requestHeaders))
    );
    root.appendChild(
      section(
        'Request Body',
        undefined,
        true,
        log.requestBodyRaw
          ? createJsonViewer(log.requestBody, log.requestBodyRaw).el
          : el('div', { class: 'apd-empty-body' }, ['No body'])
      )
    );
    root.appendChild(
      section('Response Headers', Object.keys(log.responseHeaders).length, false, keyValueTable(log.responseHeaders))
    );
    root.appendChild(
      section(
        'Response Body',
        undefined,
        true,
        log.responseBodyRaw
          ? createJsonViewer(log.responseBody, log.responseBodyRaw).el
          : el('div', { class: 'apd-empty-body' }, ['No body'])
      )
    );
  }

  render(null);
  return { el: root, setLog: render };
}
