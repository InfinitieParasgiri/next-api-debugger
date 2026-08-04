import { useEffect, useMemo, useRef, useState } from 'react';

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

/**
 * Wraps every case-insensitive occurrence of `term` in <mark> tags by
 * walking rendered text nodes directly (rather than regex-replacing the
 * HTML string). A text-node walk can never split or overlap the <span>
 * tags the syntax highlighter already inserted, whereas string-level
 * replacement could land a <mark> half-inside a tag. Returns the list of
 * created <mark> elements in document order, which the caller uses
 * directly for navigation instead of re-querying the DOM later.
 */
function applyHighlights(container: HTMLElement, term: string): HTMLElement[] {
  container.querySelectorAll('mark.apd-json-highlight').forEach((mark) => {
    const text = document.createTextNode(mark.textContent || '');
    mark.parentNode?.replaceChild(text, mark);
  });
  container.normalize();

  if (!term) return [];

  const lowerTerm = term.toLowerCase();
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let node: Node | null;
  // eslint-disable-next-line no-cond-assign
  while ((node = walker.nextNode())) textNodes.push(node as Text);

  const marks: HTMLElement[] = [];
  for (const textNode of textNodes) {
    const text = textNode.textContent || '';
    const lowerText = text.toLowerCase();
    if (!lowerText.includes(lowerTerm)) continue;

    const frag = document.createDocumentFragment();
    let lastIndex = 0;
    let idx = lowerText.indexOf(lowerTerm);
    while (idx !== -1) {
      if (idx > lastIndex) frag.appendChild(document.createTextNode(text.slice(lastIndex, idx)));
      const mark = document.createElement('mark');
      mark.className = 'apd-json-highlight';
      mark.textContent = text.slice(idx, idx + term.length);
      frag.appendChild(mark);
      marks.push(mark);
      lastIndex = idx + term.length;
      idx = lowerText.indexOf(lowerTerm, lastIndex);
    }
    if (lastIndex < text.length) frag.appendChild(document.createTextNode(text.slice(lastIndex)));
    textNode.parentNode?.replaceChild(frag, textNode);
  }

  return marks;
}

interface JsonViewerProps {
  value: unknown;
  raw?: string | null;
  /** Show the find-in-payload search bar. Defaults to true. */
  searchable?: boolean;
}

/** Pretty-prints JSON (or plain text fallback) with lightweight syntax highlighting. */
export function JsonViewer({ value, raw, searchable = true }: JsonViewerProps) {
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [matchCount, setMatchCount] = useState(0);
  const preRef = useRef<HTMLPreElement>(null);
  // The actual <mark> elements from the most recent highlight pass, in
  // document order. Navigation reads straight from this array instead of
  // re-querying the DOM by index/attribute, so it can't drift out of sync
  // with what's rendered even if something else re-renders in between.
  const marksRef = useRef<HTMLElement[]>([]);
  const prevSearchRef = useRef<string>('');

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

  const html = useMemo(() => (isJson ? highlight(escapeHtml(content)) : escapeHtml(content)), [content, isJson]);

  function applyActive(index: number) {
    marksRef.current.forEach((mark, i) => mark.classList.toggle('apd-active', i === index));
    marksRef.current[index]?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  // Rebuild highlights whenever the rendered content or search term changes.
  // Only resets the active index when the term itself actually changed (or
  // the previous index fell out of range) — so this stays correct even if
  // it happens to re-run for unrelated reasons (e.g. React re-rendering the
  // parent modal while new requests keep arriving in the background).
  useEffect(() => {
    if (!preRef.current) return;
    const term = search.trim();
    const termChanged = term !== prevSearchRef.current;
    prevSearchRef.current = term;

    const marks = applyHighlights(preRef.current, term);
    marksRef.current = marks;
    setMatchCount(marks.length);

    const nextIndex = termChanged || activeIndex >= marks.length ? 0 : activeIndex;
    setActiveIndex(nextIndex);
    applyActive(nextIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html, search]);

  function goTo(delta: number) {
    if (matchCount === 0) return;
    const next = (activeIndex + delta + matchCount) % matchCount;
    setActiveIndex(next);
    applyActive(next);
  }

  return (
    <div>
      {searchable && content.length > 0 && (
        <div className="apd-json-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Find in payload..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                goTo(e.shiftKey ? -1 : 1);
              }
            }}
            spellCheck={false}
          />
          {search && (
            <span className="apd-json-search-count">
              {matchCount > 0 ? `${activeIndex + 1} / ${matchCount}` : 'No matches'}
            </span>
          )}
          {search && matchCount > 0 && (
            <div className="apd-json-search-nav">
              <button
                type="button"
                onClick={() => goTo(-1)}
                aria-label="Previous match"
                title="Previous match (Shift+Enter)"
              >
                ↑
              </button>
              <button type="button" onClick={() => goTo(1)} aria-label="Next match" title="Next match (Enter)">
                ↓
              </button>
            </div>
          )}
        </div>
      )}
      {/* eslint-disable-next-line react/no-danger */}
      <pre ref={preRef} className="apd-json" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
