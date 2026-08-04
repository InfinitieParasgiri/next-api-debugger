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
 * HTML string). This is what keeps it safe: a text-node walk can never
 * split or overlap the <span> tags the syntax highlighter already inserted,
 * whereas string-level replacement could land a <mark> half-inside a tag.
 * The one tradeoff is a match can't span across two adjacent text nodes
 * (e.g. straddling a highlighted token and the plain punctuation next to
 * it) — acceptable for a find-in-payload tool.
 */
function applyHighlights(container: HTMLElement, term: string): number {
  const marks = container.querySelectorAll('mark.apd-json-highlight');
  marks.forEach((mark) => {
    const text = document.createTextNode(mark.textContent || '');
    mark.parentNode?.replaceChild(text, mark);
  });
  container.normalize();

  if (!term) return 0;

  const lowerTerm = term.toLowerCase();
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let node: Node | null;
  // eslint-disable-next-line no-cond-assign
  while ((node = walker.nextNode())) textNodes.push(node as Text);

  let count = 0;
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
      mark.dataset.apdMatchIndex = String(count);
      mark.textContent = text.slice(idx, idx + term.length);
      frag.appendChild(mark);
      count += 1;
      lastIndex = idx + term.length;
      idx = lowerText.indexOf(lowerTerm, lastIndex);
    }
    if (lastIndex < text.length) frag.appendChild(document.createTextNode(text.slice(lastIndex)));
    textNode.parentNode?.replaceChild(frag, textNode);
  }

  return count;
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

  // Re-apply text highlights whenever the underlying content changes or the
  // search term changes. Runs after the innerHTML has been (re)written.
  useEffect(() => {
    if (!preRef.current) return;
    const count = applyHighlights(preRef.current, search.trim());
    setMatchCount(count);
    setActiveIndex(0);
  }, [html, search]);

  // Move the "active" highlight and scroll it into view.
  useEffect(() => {
    if (!preRef.current || matchCount === 0) return;
    preRef.current.querySelectorAll('mark.apd-json-highlight').forEach((mark) => {
      mark.classList.toggle('apd-active', mark.getAttribute('data-apd-match-index') === String(activeIndex));
    });
    const active = preRef.current.querySelector(`mark.apd-json-highlight[data-apd-match-index="${activeIndex}"]`);
    active?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [activeIndex, matchCount]);

  function goTo(delta: number) {
    if (matchCount === 0) return;
    setActiveIndex((i) => (i + delta + matchCount) % matchCount);
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
              if (e.key === 'Enter') goTo(e.shiftKey ? -1 : 1);
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
              <button type="button" onClick={() => goTo(-1)} aria-label="Previous match" title="Previous match (Shift+Enter)">
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
