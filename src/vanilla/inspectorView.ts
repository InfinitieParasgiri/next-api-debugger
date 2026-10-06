import { ElementInfo, ElementTreeNode, DataSourceInfo } from '../types';
import { buildElementInfo } from '../core/inspector/elementInfo';
import { buildElementTree } from '../core/inspector/tree';
import { logStore } from '../core/logStore';
import { startPicking, PickController } from '../core/inspector/pick';
import { createHighlightBox, HighlightBox } from '../core/inspector/highlight';
import { copyToClipboard } from '../core/utils';
import { editorLink } from '../core/inspector/editorLink';
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
    const card = el('div', { class: 'apd-source-card' });
    if (componentName) card.appendChild(el('div', {}, ['Component: ', el('strong', {}, [componentName])]));
    card.appendChild(el('div', { class: 'apd-source-none' }, ['Source file unavailable. For React/Next.js, enable the Babel source plugin for exact JSX paths.']));
    return card;
  }

  const location = source.line ? `${source.file}:${source.line}${source.column ? `:${source.column}` : ''}` : source.file;
  const label = source.origin === 'plain-html' ? `Rendered page: ${location}` : location;
  const href = editorLink(source, editorProjectRoot);

  const pathEl = href
    ? el('a', { class: 'apd-source-path', href, title: 'Open in VS Code' }, [label])
    : el('span', { class: 'apd-source-path apd-source-path-plain' }, [label]);

  const meta = el('div', { class: 'apd-source-meta' }, [
    el('span', { class: `apd-confidence-badge apd-confidence-${source.confidence}` }, [source.confidence]),
    el('span', {}, [`via ${source.origin}`]),
  ]);
  if (!href && source.origin !== 'plain-html') {
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

// How many levels of the SELECTED element's own descendants auto-expand by
// default, tracked relative to the selected element (not the tree's
// absolute depth) — see the matching comment in ElementTreeView.tsx.
const DEFAULT_EXPAND_DEPTH = 3;

function dataSourceBadge(info: DataSourceInfo): HTMLElement | null {
  if (info.kind === 'unknown') return null;
  if (info.kind === 'api') {
    return el(
      'span',
      { class: 'apd-datasource-badge apd-datasource-api', title: `Matches a value from a captured response: ${info.method} ${info.endpoint}` },
      ['API']
    );
  }
  return el(
    'span',
    {
      class: 'apd-datasource-badge apd-datasource-static',
      title: 'No matching value found in any captured API response this session — may be hardcoded, or fetched server-side before the page loaded',
    },
    ['STATIC']
  );
}

function tagLabel(node: ElementTreeNode): HTMLElement {
  const parts: (string | HTMLElement)[] = [`<${node.tag}`];
  if (node.id) parts.push(el('span', { class: 'apd-tree-id' }, [` id="${node.id}"`]));
  if (node.classes.length > 0) parts.push(el('span', { class: 'apd-tree-class' }, [` class="${node.classes.join(' ')}"`]));
  parts.push('>');
  return el('span', { class: node.isSelected ? 'apd-tree-tag apd-tree-selected-tag' : 'apd-tree-tag' }, parts);
}

/**
 * `prefix`: everything already drawn to the left of this node's own
 * connector — the accumulated "│   " / "    " segments from every ancestor
 * branch above it. `connector`: this node's own glyph ('├── ', '└── ', or
 * '' only at the very top of the whole tree). `depthFromSelected`: -1 while
 * still walking down the ancestor chain, 0 at the selected element itself,
 * incrementing for each level of its own descendants.
 */
function treeNodeRow(node: ElementTreeNode, prefix: string, connector: string, depthFromSelected: number, editorProjectRoot?: string): HTMLElement {
  const hasChildren = node.children.length > 0;
  let open = !!node.isSelected || !!node.isAncestorPath || depthFromSelected < DEFAULT_EXPAND_DEPTH;

  const toggle = el('span', { class: hasChildren ? 'apd-tree-toggle' : 'apd-tree-toggle apd-tree-toggle-leaf' }, [
    hasChildren ? (open ? '▾' : '▸') : '•',
  ]);

  const rowClass =
    (hasChildren ? 'apd-tree-row apd-tree-clickable' : 'apd-tree-row') + (node.isSelected ? ' apd-tree-selected-row' : '');
  const sourceHref = node.source ? editorLink(node.source, editorProjectRoot) : null;
  const sourceLabel = node.source ? `${node.source.file}${node.source.line ? `:${node.source.line}` : ''}` : '';
  const sourceElement = sourceHref
    ? el('a', { class: 'apd-tree-source apd-tree-source-link', href: sourceHref, title: 'Open in VS Code' }, [sourceLabel])
    : node.source ? el('span', { class: 'apd-tree-source' }, [sourceLabel]) : null;
  if (sourceHref) sourceElement?.addEventListener('click', (event) => event.stopPropagation());
  const row = el('div', { class: rowClass }, [
    el('span', { class: 'apd-tree-prefix' }, [prefix + connector]),
    toggle,
    tagLabel(node),
    node.isSelected ? el('span', { class: 'apd-tree-selected-label' }, ['← Selected']) : null,
    node.componentName ? el('span', { class: 'apd-tree-component' }, [node.componentName]) : null,
    dataSourceBadge(node.dataSource),
    sourceElement,
  ]);

  const wrap = el('div', { class: 'apd-tree-node' }, [row]);

  const childPrefix = prefix + (connector === '' ? '' : connector === '└── ' ? '    ' : '│   ');
  const childDepthFromSelected = node.isSelected ? 0 : depthFromSelected < 0 ? -1 : depthFromSelected + 1;

  let childrenWrap: HTMLElement | null = null;
  if (hasChildren) {
    childrenWrap = el('div', {}, [
      ...node.children.map((child, i) =>
        treeNodeRow(child, childPrefix, i === node.children.length - 1 ? '└── ' : '├── ', childDepthFromSelected, editorProjectRoot)
      ),
      typeof node.truncatedChildCount === 'number'
        ? el('div', { class: 'apd-tree-truncated' }, [`${childPrefix}+${node.truncatedChildCount} more not shown`])
        : null,
    ]);
    childrenWrap.style.display = open ? '' : 'none';
    wrap.appendChild(childrenWrap);

    row.addEventListener('click', () => {
      open = !open;
      toggle.textContent = open ? '▾' : '▸';
      childrenWrap!.style.display = open ? '' : 'none';
    });
  }

  return wrap;
}

function elementTreeView(root: ElementTreeNode, editorProjectRoot?: string): HTMLElement {
  return el('div', { class: 'apd-tree' }, [treeNodeRow(root, '', '', -1, editorProjectRoot)]);
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
        const tree = buildElementTree(target, logStore.getLogs());
        renderInfo(info, tree);
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

  function renderInfo(info: ElementInfo, tree: ElementTreeNode) {
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

    const treeHeader = el('div', { class: 'apd-section-header' }, [
      'Element Tree',
      el(
        'span',
        { style: 'font-weight:400;color:var(--apd-text-faint);font-size:10.5px' },
        [' — structure, source, and data origin for this element and its descendants']
      ),
    ]);
    root.appendChild(el('div', { class: 'apd-section' }, [treeHeader, el('div', { class: 'apd-section-body' }, [elementTreeView(tree, editorProjectRoot)])]));
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
