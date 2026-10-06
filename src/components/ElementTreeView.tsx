import { useState } from 'react';
import { DataSourceInfo, ElementTreeNode } from '../types';
import { editorLink } from '../core/inspector/editorLink';

// How many levels of the SELECTED element's own descendants auto-expand by
// default. Deliberately tracked relative to the selected element, not the
// tree's absolute depth — the ancestor chain above it (always forced open
// via isAncestorPath) can be arbitrarily deep in a real app, and that
// shouldn't eat into the budget for how much of the interesting part (what's
// actually inside the thing you clicked) shows up expanded by default.
const DEFAULT_EXPAND_DEPTH = 3;

function DataSourceBadge({ info }: { info: DataSourceInfo }) {
  if (info.kind === 'unknown') return null;
  if (info.kind === 'api') {
    return (
      <span
        className="apd-datasource-badge apd-datasource-api"
        title={`Matches a value from a captured response: ${info.method} ${info.endpoint}`}
      >
        API
      </span>
    );
  }
  return (
    <span
      className="apd-datasource-badge apd-datasource-static"
      title="No matching value found in any captured API response this session — may be hardcoded, or fetched server-side before the page loaded"
    >
      STATIC
    </span>
  );
}

function TagLabel({ node }: { node: ElementTreeNode }) {
  return (
    <span className={node.isSelected ? 'apd-tree-tag apd-tree-selected-tag' : 'apd-tree-tag'}>
      &lt;{node.tag}
      {node.id && <span className="apd-tree-id"> id="{node.id}"</span>}
      {node.classes.length > 0 && <span className="apd-tree-class"> class="{node.classes.join(' ')}"</span>}
      &gt;
    </span>
  );
}

interface TreeNodeRowProps {
  node: ElementTreeNode;
  editorProjectRoot?: string;
  /** Everything already drawn to the left of this node's own connector — accumulated "│   " / "    " segments from every ancestor branch above it. */
  prefix: string;
  /** This node's own connector glyph: '├── ', '└── ', or '' only for the very top of the whole tree. */
  connector: string;
  /** -1 while still walking down the ancestor chain (not yet reached the selected element); 0 at the selected element itself; increments for each level of its own descendants. */
  depthFromSelected: number;
}

function TreeNodeRow({ node, editorProjectRoot, prefix, connector, depthFromSelected }: TreeNodeRowProps) {
  const [open, setOpen] = useState(node.isSelected || node.isAncestorPath || depthFromSelected < DEFAULT_EXPAND_DEPTH);
  const hasChildren = node.children.length > 0;

  const childPrefix = prefix + (connector === '' ? '' : connector === '└── ' ? '    ' : '│   ');
  const childDepthFromSelected = node.isSelected ? 0 : depthFromSelected < 0 ? -1 : depthFromSelected + 1;
  const sourceHref = node.source ? editorLink(node.source, editorProjectRoot) : null;
  const sourceLabel = node.source
    ? `${node.source.file}${node.source.line ? `:${node.source.line}` : ''}`
    : '';

  return (
    <div className="apd-tree-node">
      <div
        className={
          hasChildren
            ? `apd-tree-row apd-tree-clickable${node.isSelected ? ' apd-tree-selected-row' : ''}`
            : `apd-tree-row${node.isSelected ? ' apd-tree-selected-row' : ''}`
        }
        onClick={() => hasChildren && setOpen((o) => !o)}
      >
        <span className="apd-tree-prefix">
          {prefix}
          {connector}
        </span>
        {hasChildren ? (
          <span className="apd-tree-toggle">{open ? '▾' : '▸'}</span>
        ) : (
          <span className="apd-tree-toggle apd-tree-toggle-leaf">•</span>
        )}
        <TagLabel node={node} />
        {node.isSelected && <span className="apd-tree-selected-label">← Selected</span>}
        {node.componentName && <span className="apd-tree-component">{node.componentName}</span>}
        <DataSourceBadge info={node.dataSource} />
        {sourceHref ? (
          <a className="apd-tree-source apd-tree-source-link" href={sourceHref} title="Open in VS Code" onClick={(event) => event.stopPropagation()}>
            {sourceLabel}
          </a>
        ) : node.source ? (
          <span className="apd-tree-source">{sourceLabel}</span>
        ) : null}
      </div>
      {open && hasChildren && (
        <div>
          {node.children.map((child, i) => {
            const isLast = i === node.children.length - 1;
            return (
              <TreeNodeRow
                key={i}
                node={child}
                editorProjectRoot={editorProjectRoot}
                prefix={childPrefix}
                connector={isLast ? '└── ' : '├── '}
                depthFromSelected={childDepthFromSelected}
              />
            );
          })}
          {typeof node.truncatedChildCount === 'number' && (
            <div className="apd-tree-truncated">
              {childPrefix}+{node.truncatedChildCount} more not shown
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function ElementTreeView({ root, editorProjectRoot }: { root: ElementTreeNode; editorProjectRoot?: string }) {
  return (
    <div className="apd-tree">
      <TreeNodeRow node={root} editorProjectRoot={editorProjectRoot} prefix="" connector="" depthFromSelected={-1} />
    </div>
  );
}
