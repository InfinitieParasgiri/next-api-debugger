const TOKEN_RE =
  /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g;

function highlightSyntax(escapedJson: string): string {
  return escapedJson.replace(TOKEN_RE, (match) => {
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

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Normalizes an arbitrary value/raw pair into a pretty-printable string, matching what the JSON viewer displays. */
export function toDisplayContent(value: unknown, raw?: string | null): { content: string; isJson: boolean } {
  if (value !== null && value !== undefined && typeof value === 'object') {
    return { content: JSON.stringify(value, null, 2), isJson: true };
  }
  if (typeof value === 'string') {
    try {
      return { content: JSON.stringify(JSON.parse(value), null, 2), isJson: true };
    } catch {
      return { content: raw ?? value, isJson: false };
    }
  }
  return { content: raw ?? String(value ?? ''), isJson: false };
}

/**
 * Builds the fully-rendered HTML for the JSON viewer in one pure pass:
 * search matches are wrapped first, and syntax coloring is layered on top.
 *
 * Deliberately no positional attribute (e.g. `data-idx`) is written onto
 * the `<mark>` tags: the syntax-color regex above has no word-boundary
 * guard around numbers, so a numeric attribute value could itself get
 * matched and wrapped in a `<span>`, corrupting the attribute. Match
 * position is instead tracked purely by DOM order — `<mark>` elements
 * come out of `querySelectorAll` in the same left-to-right order they
 * were inserted in.
 * The class attribute itself uses single quotes rather than double
 * quotes for the same reason in reverse: the syntax-color regex matches
 * JSON strings by their double-quote delimiters, so a double-quoted
 * attribute here would introduce stray `"` characters that could be
 * misread as the start/end of a JSON string token.
 *
 * This is intentionally a pure function of (content, term): both the
 * React and vanilla UIs render it directly rather than mutating existing
 * DOM nodes, so the output can never drift out of sync with what's
 * rendered no matter how often the surrounding UI re-renders.
 */
export function buildJsonHtml(content: string, isJson: boolean, term: string): { html: string; matchCount: number } {
  const escaped = escapeHtml(content);
  let matchCount = 0;
  let withMarks = escaped;

  if (term) {
    const re = new RegExp(escapeRegExp(term), 'gi');
    withMarks = escaped.replace(re, (match) => {
      matchCount += 1;
      return `<mark class='apd-json-highlight'>${match}</mark>`;
    });
  }

  const html = isJson ? highlightSyntax(withMarks) : withMarks;
  return { html, matchCount };
}
