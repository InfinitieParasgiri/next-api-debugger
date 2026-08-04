import { Fragment, useState } from 'react';
import { ApiLogEntry } from '../types';
import { CopyButton } from './CopyButton';
import { JsonViewer } from './JsonViewer';
import { generateCurl } from '../core/curlGenerator';
import { formatBytes, formatDuration, formatTimestamp, safeStringify } from '../core/utils';

interface RequestDetailProps {
  log: ApiLogEntry | null;
  onTogglePin: (id: string) => void;
}

function Section({
  title,
  count,
  defaultOpen = true,
  children,
}: {
  title: string;
  count?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="apd-section">
      <div className="apd-section-header" onClick={() => setOpen((o) => !o)}>
        <span>
          {title}
          {typeof count === 'number' ? ` (${count})` : ''}
        </span>
        <span>{open ? '−' : '+'}</span>
      </div>
      {open && <div className="apd-section-body">{children}</div>}
    </div>
  );
}

function KeyValueTable({ data }: { data: Record<string, string> }) {
  const entries = Object.entries(data);
  if (entries.length === 0) return <div className="apd-section-body apd-empty-body">None</div>;
  return (
    <div className="apd-kv">
      {entries.map(([k, v]) => (
        <Fragment key={k}>
          <div className="apd-kv-key">{k}</div>
          <div className="apd-kv-val">{v}</div>
        </Fragment>
      ))}
    </div>
  );
}

export function RequestDetail({ log, onTogglePin }: RequestDetailProps) {
  if (!log) {
    return (
      <div className="apd-detail">
        <div className="apd-detail-empty">Select a request to see full details</div>
      </div>
    );
  }

  const curl = generateCurl(log);
  const requestJson = safeStringify(log.requestBody) ?? log.requestBodyRaw ?? '';
  const responseJson = safeStringify(log.responseBody) ?? log.responseBodyRaw ?? '';

  return (
    <div className="apd-detail">
      <div className="apd-detail-header">
        <div className="apd-detail-url">
          <strong>{log.method}</strong> {log.url}
        </div>
        <button
          type="button"
          className="apd-action-btn"
          onClick={() => onTogglePin(log.id)}
          title={log.pinned ? 'Unpin' : 'Pin this request'}
        >
          {log.pinned ? '★ Pinned' : '☆ Pin'}
        </button>
      </div>

      <div className="apd-meta-grid">
        <div>
          <div className="apd-meta-label">Status</div>
          <div className="apd-meta-value" style={{ color: log.success ? 'var(--apd-success)' : 'var(--apd-error)' }}>
            {log.responseStatus ?? 'Failed'} {log.responseStatusText}
          </div>
        </div>
        <div>
          <div className="apd-meta-label">Duration</div>
          <div className="apd-meta-value">{formatDuration(log.duration)}</div>
        </div>
        <div>
          <div className="apd-meta-label">Time</div>
          <div className="apd-meta-value">{formatTimestamp(log.timestamp)}</div>
        </div>
        <div>
          <div className="apd-meta-label">Source</div>
          <div className="apd-meta-value">{log.source}</div>
        </div>
        <div>
          <div className="apd-meta-label">Req. size</div>
          <div className="apd-meta-value">{formatBytes(log.requestSize)}</div>
        </div>
        <div>
          <div className="apd-meta-label">Res. size</div>
          <div className="apd-meta-value">{formatBytes(log.responseSize)}</div>
        </div>
      </div>

      {log.error && (
        <div className="apd-section" style={{ borderColor: 'var(--apd-error)' }}>
          <div className="apd-section-header" style={{ color: 'var(--apd-error)' }}>
            Error
          </div>
          <div className="apd-section-body">{log.error}</div>
        </div>
      )}

      <div className="apd-actions">
        <CopyButton label="Copy cURL" getText={() => curl} />
        <CopyButton label="Copy Request" getText={() => requestJson} />
        <CopyButton label="Copy Response" getText={() => responseJson} />
      </div>

      <Section title="cURL">
        <JsonViewer value={curl} />
      </Section>

      <Section title="Query Params" count={Object.keys(log.queryParams).length} defaultOpen={false}>
        <KeyValueTable data={log.queryParams} />
      </Section>

      <Section title="Request Headers" count={Object.keys(log.requestHeaders).length} defaultOpen={false}>
        <KeyValueTable data={log.requestHeaders} />
      </Section>

      <Section title="Request Body">
        {log.requestBodyRaw ? <JsonViewer value={log.requestBody} raw={log.requestBodyRaw} /> : <div className="apd-empty-body">No body</div>}
      </Section>

      <Section title="Response Headers" count={Object.keys(log.responseHeaders).length} defaultOpen={false}>
        <KeyValueTable data={log.responseHeaders} />
      </Section>

      <Section title="Response Body">
        {log.responseBodyRaw ? (
          <JsonViewer value={log.responseBody} raw={log.responseBodyRaw} />
        ) : (
          <div className="apd-empty-body">No body</div>
        )}
      </Section>
    </div>
  );
}
