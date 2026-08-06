import { buildJsonHtml, toDisplayContent } from '../core/jsonHighlight';
import { el } from './dom';

export interface JsonViewerWidget {
  el: HTMLElement;
}

/** Vanilla-DOM equivalent of the React JsonViewer. Same shared highlighting
 *  logic, same CSS classes, same behavior — just built without React. */
export function createJsonViewer(value: unknown, raw: string | null | undefined, searchable = true): JsonViewerWidget {
  const { content, isJson } = toDisplayContent(value, raw);
  let search = '';
  let activeIndex = 0;
  let prevTerm = '';

  const pre = el('pre', { class: 'apd-json' });
  const searchInput = el('input', {
    type: 'text',
    placeholder: 'Find in payload...',
    spellcheck: 'false',
  }) as HTMLInputElement;
  const countEl = el('span', { class: 'apd-json-search-count' });
  const prevBtn = el(
    'button',
    { type: 'button', title: 'Previous match (Shift+Enter)', 'aria-label': 'Previous match' },
    ['↑']
  );
  const nextBtn = el('button', { type: 'button', title: 'Next match (Enter)', 'aria-label': 'Next match' }, ['↓']);
  const navWrap = el('div', { class: 'apd-json-search-nav' }, [prevBtn, nextBtn]);

  const searchIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  searchIcon.setAttribute('viewBox', '0 0 24 24');
  searchIcon.setAttribute('fill', 'none');
  searchIcon.setAttribute('stroke', 'currentColor');
  searchIcon.setAttribute('stroke-width', '2');
  searchIcon.innerHTML = '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>';

  const searchBar = el('div', { class: 'apd-json-search' }, [searchIcon, searchInput, countEl, navWrap]);

  function applyActive(marks: Element[], matchCount: number) {
    marks.forEach((mark, i) => mark.classList.toggle('apd-active', i === activeIndex));
    marks[activeIndex]?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    countEl.textContent = search ? (matchCount > 0 ? `${activeIndex + 1} / ${matchCount}` : 'No matches') : '';
    countEl.style.display = search ? '' : 'none';
    navWrap.style.display = search && matchCount > 0 ? '' : 'none';
  }

  function renderContent() {
    const term = search.trim();
    const { html, matchCount } = buildJsonHtml(content, isJson, term);
    pre.innerHTML = html;

    const termChanged = term !== prevTerm;
    prevTerm = term;
    if (termChanged || activeIndex >= matchCount) activeIndex = 0;

    const marks = Array.from(pre.querySelectorAll('mark.apd-json-highlight'));
    applyActive(marks, matchCount);
  }

  function goTo(delta: number) {
    const { matchCount } = buildJsonHtml(content, isJson, search.trim());
    if (matchCount === 0) return;
    activeIndex = (activeIndex + delta + matchCount) % matchCount;
    const marks = Array.from(pre.querySelectorAll('mark.apd-json-highlight'));
    applyActive(marks, matchCount);
  }

  searchInput.addEventListener('input', () => {
    search = searchInput.value;
    renderContent();
  });
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      goTo(e.shiftKey ? -1 : 1);
    }
  });
  prevBtn.addEventListener('click', () => goTo(-1));
  nextBtn.addEventListener('click', () => goTo(1));

  renderContent();

  const showBar = searchable && content.length > 0;
  const wrapper = el('div', {}, [showBar ? searchBar : null, pre]);
  return { el: wrapper };
}
