import { ElementInfo } from '../types';
import { buildElementInfo } from '../core/inspector/elementInfo';
import { startPicking, PickController } from '../core/inspector/pick';
import { createHighlightBox, HighlightBox } from '../core/inspector/highlight';
import { copyToClipboard } from '../core/utils';
import { el, clear } from './dom';

export interface InspectorViewWidget {
  el: HTMLElement;
  destroy: () => void;
}

function kvRows(data: Record<string, string>): HTMLElement {
  const entries = Object.entries(data).filter(([, v]) => v !== '');
  if (entries.length === 0) return el('div', { class: 'apd-empty-body' }, ['None']);
  const grid = el('div', { class: 'apd-kv' });
  entries.forEach(([k, v]) => {
    grid.appendChild(el('div', { class: 'apd-kv-key' }, [k]));
    grid.appendChild(el('div', { class: 'apd-kv-val' }, [v]));
  });
  return grid;
}

function boxLayer(cls: string, sides: { top: number; right: number; bottom: number; left: number }, inner: HTMLElement): HTMLElement {
  return el('div', { class: `apd-box-layer ${cls}` }, [
    el('span', { class: 'apd-box-label apd-box-label-top' }, [String(sides.top)]),
    el('span', { class: 'apd-box-label apd-box-label-right' }, [String(sides.right)]),
    el('span', { class: 'apd-box-label apd-box-label-bottom' }, [String(sides.bottom)]),
    el('span', { class: 'apd-box-label apd-box-label-left' }, [String(sides.left)]),
    inner,
  ]);
}

function boxModelDiagram(info: ElementInfo): HTMLElement {
  const content = el('div', { class: 'apd-box-layer-content' }, [
    `${Math.round(info.box.content.width)} × ${Math.round(info.box.content.height)}`,
  ]);
  const padding = boxLayer('apd-box-layer-padding', info.box.padding, content);
  const border = boxLayer('apd-box-layer-border', info.box.border, padding);
  const margin = boxLayer('apd-box-layer-margin', info.box.margin, border);
  return el('div', { class: 'apd-box-model' }, [margin]);
}

function sourceCard(info: ElementInfo, editorProjectRoot?: string): HTMLElement {
  const { source, componentName } = info;
  if (!source) {
    return el('div', { class: 'apd-source-card' }, [
      el('div', { class: 'apd-source-none' }, ['Source location unavailable for this element.']),
    ]);
  }

  const label = source.line ? `${source.file}:${source.line}${source.column ? `:${source.column}` : ''}` : source.file;
  const canOpen = !!editorProjectRoot;
  const href = canOpen
    ? `vscode://file/${editorProjectRoot!.replace(/\/$/, '')}/${source.file.replace(/^\//, '')}${
        source.line ? `:${source.line}:${source.column ?? 1}` : ''
      }`
    : undefined;

  const pathEl = canOpen
    ? el('a', { class: 'apd-source-path', href: href!, title: 'Open in VS Code' }, [label])
    : el('span', { class: 'apd-source-path apd-source-path-plain' }, [label]);

  const meta = el('div', { class: 'apd-source-meta' }, [
    el('span', { class: `apd-confidence-badge apd-confidence-${source.confidence}` }, [source.confidence]),
    el('span', {}, [`via ${source.origin}`]),
  ]);
  if (!canOpen) {
    const copyBtn = el('button', { type: 'button', class: 'apd-console-toggle-stack', style: 'margin-left:auto' }, [
      'Copy path',
    ]);
    copyBtn.addEventListener('click', () => copyToClipboard(label));
    meta.appendChild(copyBtn);
  }

  const card = el('div', { class: 'apd-source-card' });
  if (componentName) {
    card.appendChild(
      el('div', { style: 'font-size:11px;color:var(--apd-text-dim);margin-bottom:4px' }, [
        'Component: ',
        el('strong', { style: 'color:var(--apd-text)' }, [componentName]),
      ])
    );
  }
  card.appendChild(pathEl);
  card.appendChild(meta);
  return card;
}

function section(title: string, body: HTMLElement): HTMLElement {
  return el('div', { class: 'apd-section' }, [
    el('div', { class: 'apd-section-header' }, [title]),
    el('div', { class: 'apd-section-body' }, [body]),
  ]);
}

export function createInspectorView(onInspectingChange: (active: boolean) => void, editorProjectRoot?: string): InspectorViewWidget {
  const root = el('div', {});
  let controller: PickController | null = null;
  let highlight: HighlightBox | null = null;

  function stopHighlight() {
    highlight?.hide();
    highlight?.el.remove();
    highlight = null;
  }

  function renderEmpty(inspecting: boolean, statusText: string) {
    clear(root);
    root.className = 'apd-inspector-empty';
    const btn = el(
      'button',
      { type: 'button', class: `apd-inspect-start-btn${inspecting ? ' apd-inspecting' : ''}` },
      [inspecting ? '◼ Stop Inspecting (Esc)' : '⌖ Start Inspecting']
    );
    btn.addEventListener('click', () => (inspecting ? stop() : start()));
    root.appendChild(btn);
    root.appendChild(el('p', {}, [statusText]));
  }

  function start() {
    onInspectingChange(true);
    renderEmpty(true, 'Hover any element on the page and click to select it.');

    const box = createHighlightBox();
    document.body.appendChild(box.el);
    highlight = box;

    controller = startPicking(
      async (target) => {
        stopHighlight();
        onInspectingChange(false);
        renderEmpty(false, 'Resolving source location…');
        const info = await buildElementInfo(target);
        renderInfo(info);
      },
      (target) => {
        if (target) box.show(target.getBoundingClientRect());
        else box.hide();
      },
      () => {
        stopHighlight();
        onInspectingChange(false);
        renderEmpty(false, 'Pick any element on the page to see its DOM details, computed styles, and — when available — the exact source file responsible for it.');
      }
    );
  }

  function stop() {
    controller?.cancel();
  }

  function renderInfo(info: ElementInfo) {
    clear(root);
    root.className = '';
    root.classList.add('apd-inspector-body');

    const headerRow = el('div', { style: 'display:flex;align-items:flex-start;gap:10px;margin-bottom:12px' });
    const titleWrap = el('div', { style: 'flex:1' });
    const tagLine = el('div', { class: 'apd-inspector-tag' }, [
      `<${info.tag}`,
      info.id ? el('span', { class: 'apd-tag-id' }, [` #${info.id}`]) : null,
      ...info.classes.map((c) => el('span', { class: 'apd-tag-class' }, [` .${c}`])),
      '>',
    ]);
    titleWrap.appendChild(tagLine);
    if (info.textPreview) {
      titleWrap.appendChild(
        el('div', { style: 'font-size:11.5px;color:var(--apd-text-dim);font-family:var(--apd-mono)' }, [
          `"${info.textPreview}"`,
        ])
      );
    }
    headerRow.appendChild(titleWrap);
    const inspectAnotherBtn = el('button', { type: 'button', class: 'apd-action-btn' }, ['⌖ Inspect another']);
    inspectAnotherBtn.addEventListener('click', start);
    headerRow.appendChild(inspectAnotherBtn);
    root.appendChild(headerRow);

    if (info.ancestors.length > 0) {
      const crumb = el('div', { class: 'apd-inspector-breadcrumb' });
      [...info.ancestors].reverse().forEach((a) => {
        crumb.appendChild(el('span', {}, [`${a.tag}${a.id ? `#${a.id}` : ''}`]));
      });
      crumb.appendChild(el('span', { style: 'color:var(--apd-accent)' }, [info.tag]));
      root.appendChild(crumb);
    }

    root.appendChild(sourceCard(info, editorProjectRoot));

    const metaGrid = el('div', { class: 'apd-meta-grid' });
    const metaItem = (label: string, value: string) =>
      el('div', {}, [el('div', { class: 'apd-meta-label' }, [label]), el('div', { class: 'apd-meta-value' }, [value])]);
    metaGrid.appendChild(metaItem('Position', `${Math.round(info.rect.x)}, ${Math.round(info.rect.y)}`));
    metaGrid.appendChild(metaItem('Size', `${Math.round(info.rect.width)} × ${Math.round(info.rect.height)}`));
    metaGrid.appendChild(metaItem('Children', String(info.childCount)));
    root.appendChild(metaGrid);

    root.appendChild(section('Box Model', boxModelDiagram(info)));
    root.appendChild(section(`Attributes (${Object.keys(info.attributes).length})`, kvRows(info.attributes)));
    root.appendChild(section('Computed Styles', kvRows(info.computedStyles)));
  }

  renderEmpty(false, 'Pick any element on the page to see its DOM details, computed styles, and — when available — the exact source file responsible for it.');

  return {
    el: root,
    destroy() {
      controller?.cancel();
      stopHighlight();
    },
  };
}
