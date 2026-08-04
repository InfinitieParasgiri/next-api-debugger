const TOKEN_RE =
  /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g;

function highlight(json: string): string {
  return json.replace(TOKEN_RE, (match) => {
    let cls = 'apd-json-num';
    if (/^"/.test(match)) {
      cls = /:$/.test(match) ? 'apd-json-key' : 'apd-json-str';
    } else if (/true|false/.test(match)) {
      cls = 'apd-json-bool';
    } else if (/null/.test(match)) {
      cls = 'apd-json-null';
    }
    return `<span class="${cls}">${match}</span>`;
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

interface JsonViewerProps {
  value: unknown;
  raw?: string | null;
}

/** Pretty-prints JSON (or plain text fallback) with lightweight syntax highlighting. */
export function JsonViewer({ value, raw }: JsonViewerProps) {
  let content: string;
  let isJson = true;

  if (value !== null && value !== undefined && typeof value === 'object') {
    content = JSON.stringify(value, null, 2);
  } else if (typeof value === 'string') {
    try {
      content = JSON.stringify(JSON.parse(value), null, 2);
    } catch {
      content = raw ?? value;
      isJson = false;
    }
  } else {
    content = raw ?? String(value ?? '');
    isJson = false;
  }

  const html = isJson ? highlight(escapeHtml(content)) : escapeHtml(content);

  // eslint-disable-next-line react/no-danger
  return <pre className="apd-json" dangerouslySetInnerHTML={{ __html: html }} />;
}
