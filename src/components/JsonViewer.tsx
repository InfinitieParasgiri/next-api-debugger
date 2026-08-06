import { useEffect, useMemo, useRef, useState } from 'react';
import { buildJsonHtml, toDisplayContent } from '../core/jsonHighlight';

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
  const preRef = useRef<HTMLPreElement>(null);
  const prevTermRef = useRef('');

  const { content, isJson } = toDisplayContent(value, raw);
  const term = search.trim();
  const { html, matchCount } = useMemo(() => buildJsonHtml(content, isJson, term), [content, isJson, term]);

  // Reset to the first match whenever the search term changes, or clamp
  // back in range if the match count shrank under the current index.
  useEffect(() => {
    const termChanged = term !== prevTermRef.current;
    prevTermRef.current = term;
    if (termChanged || activeIndex >= matchCount) {
      setActiveIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term, matchCount]);

  // The only imperative work left: mark which already-rendered element is
  // "active" and scroll it into view. Runs after `html` above has been
  // committed to the DOM, so the target is guaranteed to exist and to be
  // the actual live element (not a stale reference to a detached one).
  useEffect(() => {
    if (!preRef.current) return;
    const marks = preRef.current.querySelectorAll('mark.apd-json-highlight');
    marks.forEach((mark, i) => mark.classList.toggle('apd-active', i === activeIndex));
    marks[activeIndex]?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [html, activeIndex]);

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
