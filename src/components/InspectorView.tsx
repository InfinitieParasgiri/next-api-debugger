import { useEffect, useRef, useState } from 'react';
import { ElementInfo, ElementTreeNode } from '../types';
import { buildElementInfo } from '../core/inspector/elementInfo';
import { buildElementTree } from '../core/inspector/tree';
import { logStore } from '../core/logStore';
import { startPicking, PickController } from '../core/inspector/pick';
import { createHighlightBox, HighlightBox } from '../core/inspector/highlight';
import { copyToClipboard } from '../core/utils';
import { editorLink } from '../core/inspector/editorLink';
import { ElementTreeView } from './ElementTreeView';

interface InspectorViewProps {
  /** Called whenever picking starts/stops, so the parent can minimize the modal out of the way while picking (otherwise the modal's own backdrop would block clicking elements on the page). */
  onInspectingChange: (active: boolean) => void;
  editorProjectRoot?: string;
}

function KeyValueRows({ data }: { data: Record<string, string> }) {
  const entries = Object.entries(data).filter(([, v]) => v !== '');
  if (entries.length === 0) return <div className="apd-empty-body">None</div>;
  return (
    <div className="apd-kv">
      {entries.map(([k, v]) => (
        <div key={k} style={{ display: 'contents' }}>
          <div className="apd-kv-key">{k}</div>
          <div className="apd-kv-val">{v}</div>
        </div>
      ))}
    </div>
  );
}

function BoxModelDiagram({ info }: { info: ElementInfo }) {
  const { box } = info;
  return (
    <div className="apd-box-model">
      <div className="apd-box-layer apd-box-layer-margin">
        <span className="apd-box-label apd-box-label-top">{box.margin.top}</span>
        <span className="apd-box-label apd-box-label-right">{box.margin.right}</span>
        <span className="apd-box-label apd-box-label-bottom">{box.margin.bottom}</span>
        <span className="apd-box-label apd-box-label-left">{box.margin.left}</span>
        <div className="apd-box-layer apd-box-layer-border">
          <span className="apd-box-label apd-box-label-top">{box.border.top}</span>
          <span className="apd-box-label apd-box-label-right">{box.border.right}</span>
          <span className="apd-box-label apd-box-label-bottom">{box.border.bottom}</span>
          <span className="apd-box-label apd-box-label-left">{box.border.left}</span>
          <div className="apd-box-layer apd-box-layer-padding">
            <span className="apd-box-label apd-box-label-top">{box.padding.top}</span>
            <span className="apd-box-label apd-box-label-right">{box.padding.right}</span>
            <span className="apd-box-label apd-box-label-bottom">{box.padding.bottom}</span>
            <span className="apd-box-label apd-box-label-left">{box.padding.left}</span>
            <div className="apd-box-layer-content">
              {Math.round(box.content.width)} × {Math.round(box.content.height)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SourceCard({ info, editorProjectRoot }: { info: ElementInfo; editorProjectRoot?: string }) {
  const { source, componentName } = info;
  if (!source) {
    return (
      <div className="apd-source-card">
        {componentName && <div>Component: <strong>{componentName}</strong></div>}
        <div className="apd-source-none">Source file unavailable. For React/Next.js, enable the Babel source plugin for exact JSX paths.</div>
      </div>
    );
  }

  const location = source.line ? `${source.file}:${source.line}${source.column ? `:${source.column}` : ''}` : source.file;
  const label = source.origin === 'plain-html' ? `Rendered page: ${location}` : location;
  const href = editorLink(source, editorProjectRoot);

  return (
    <div className="apd-source-card">
      {componentName && (
        <div style={{ fontSize: 11, color: 'var(--apd-text-dim)', marginBottom: 4 }}>
          Component: <strong style={{ color: 'var(--apd-text)' }}>{componentName}</strong>
        </div>
      )}
      {href ? (
        <a className="apd-source-path" href={href} title="Open in VS Code">
          {label}
        </a>
      ) : (
        <span className="apd-source-path apd-source-path-plain">{label}</span>
      )}
      <div className="apd-source-meta">
        <span className={`apd-confidence-badge apd-confidence-${source.confidence}`}>{source.confidence}</span>
        <span>via {source.origin}</span>
        {!href && source.origin !== 'plain-html' && (
          <button
            type="button"
            className="apd-console-toggle-stack"
            onClick={() => copyToClipboard(label)}
            style={{ marginLeft: 'auto' }}
          >
            Copy path
          </button>
        )}
      </div>
    </div>
  );
}

export function InspectorView({ onInspectingChange, editorProjectRoot }: InspectorViewProps) {
  const [inspecting, setInspecting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<ElementInfo | null>(null);
  const [tree, setTree] = useState<ElementTreeNode | null>(null);
  const controllerRef = useRef<PickController | null>(null);
  const highlightRef = useRef<HighlightBox | null>(null);

  useEffect(() => {
    return () => {
      controllerRef.current?.cancel();
      highlightRef.current?.el.remove();
    };
  }, []);

  function stopHighlight() {
    highlightRef.current?.hide();
    highlightRef.current?.el.remove();
    highlightRef.current = null;
  }

  function start() {
    setInspecting(true);
    onInspectingChange(true);

    const box = createHighlightBox();
    document.body.appendChild(box.el);
    highlightRef.current = box;

    controllerRef.current = startPicking(
      async (el) => {
        stopHighlight();
        setInspecting(false);
        onInspectingChange(false);
        setLoading(true);
        const built = await buildElementInfo(el);
        setInfo(built);
        setTree(buildElementTree(el, logStore.getLogs()));
        setLoading(false);
      },
      (el) => {
        if (el) box.show(el.getBoundingClientRect());
        else box.hide();
      },
      () => {
        stopHighlight();
        setInspecting(false);
        onInspectingChange(false);
      }
    );
  }

  function stop() {
    controllerRef.current?.cancel();
  }

  if (!info) {
    return (
      <div className="apd-inspector-empty">
        <button type="button" className={`apd-inspect-start-btn${inspecting ? ' apd-inspecting' : ''}`} onClick={inspecting ? stop : start}>
          {inspecting ? '◼ Stop Inspecting (Esc)' : '⌖ Start Inspecting'}
        </button>
        <p>
          {inspecting
            ? 'Hover any element on the page and click to select it.'
            : loading
              ? 'Resolving source location…'
              : 'Pick any element on the page to see its DOM details, computed styles, and — when available — the exact source file responsible for it.'}
        </p>
      </div>
    );
  }

  return (
    <div className="apd-inspector-body">
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <div className="apd-inspector-tag">
            &lt;{info.tag}
            {info.id && <span className="apd-tag-id"> #{info.id}</span>}
            {info.classes.map((c) => (
              <span key={c} className="apd-tag-class">
                {' '}
                .{c}
              </span>
            ))}
            &gt;
          </div>
          {info.textPreview && (
            <div style={{ fontSize: 11.5, color: 'var(--apd-text-dim)', fontFamily: 'var(--apd-mono)' }}>
              "{info.textPreview}"
            </div>
          )}
        </div>
        <button type="button" className="apd-action-btn" onClick={start}>
          ⌖ Inspect another
        </button>
      </div>

      {info.ancestors.length > 0 && (
        <div className="apd-inspector-breadcrumb">
          {[...info.ancestors].reverse().map((a, i) => (
            <span key={i}>
              {a.tag}
              {a.id ? `#${a.id}` : ''}
            </span>
          ))}
          <span style={{ color: 'var(--apd-accent)' }}>{info.tag}</span>
        </div>
      )}

      <SourceCard info={info} editorProjectRoot={editorProjectRoot} />

      <div className="apd-meta-grid">
        <div>
          <div className="apd-meta-label">Position</div>
          <div className="apd-meta-value">
            {Math.round(info.rect.x)}, {Math.round(info.rect.y)}
          </div>
        </div>
        <div>
          <div className="apd-meta-label">Size</div>
          <div className="apd-meta-value">
            {Math.round(info.rect.width)} × {Math.round(info.rect.height)}
          </div>
        </div>
        <div>
          <div className="apd-meta-label">Children</div>
          <div className="apd-meta-value">{info.childCount}</div>
        </div>
      </div>

      <div className="apd-section">
        <div className="apd-section-header">Box Model</div>
        <div className="apd-section-body">
          <BoxModelDiagram info={info} />
        </div>
      </div>

      <div className="apd-section">
        <div className="apd-section-header">Attributes ({Object.keys(info.attributes).length})</div>
        <div className="apd-section-body">
          <KeyValueRows data={info.attributes} />
        </div>
      </div>

      <div className="apd-section">
        <div className="apd-section-header">Computed Styles</div>
        <div className="apd-section-body">
          <KeyValueRows data={info.computedStyles} />
        </div>
      </div>

      {tree && (
        <div className="apd-section">
          <div className="apd-section-header">
            Element Tree
            <span style={{ fontWeight: 400, color: 'var(--apd-text-faint)', fontSize: 10.5 }}>
              {' '}
              — structure, source, and data origin for this element and its descendants
            </span>
          </div>
          <div className="apd-section-body">
            <ElementTreeView root={tree} />
          </div>
        </div>
      )}
    </div>
  );
}
