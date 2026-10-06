import type { SourceLocation } from '../../types';

/** Only offer an editor link when a real source file can be mapped locally. */
export function editorLink(source: SourceLocation, projectRoot?: string): string | null {
  if (!projectRoot || source.origin === 'plain-html') return null;

  const root = projectRoot.replace(/\\/g, '/').replace(/\/+$/, '');
  const file = source.file.replace(/\\/g, '/').replace(/^\.\//, '');
  if (!root || !/^(?:\/|[A-Za-z]:\/)/.test(root)) return null;
  if (/^[a-z][a-z\d+.-]*:\/\//i.test(file) || file.split('/').includes('..')) return null;
  if (!/\.(?:[cm]?[jt]sx?|vue|svelte|astro|html?|mdx|php)$/i.test(file)) return null;

  const absolute = /^(?:\/|[A-Za-z]:\/)/.test(file);
  const path = absolute ? file : `${root}/${file}`;
  if (absolute && path !== root && !path.startsWith(`${root}/`)) return null;

  const encodedPath = encodeURI(path).replace(/#/g, '%23').replace(/\?/g, '%3F');
  return `vscode://file/${encodedPath}:${source.line ?? 1}:${source.column ?? 1}`;
}
