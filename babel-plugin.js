'use strict';

const path = require('path');

/**
 * Injects `data-apd-source="relative/path.jsx:line:column"` onto every
 * *native* JSX element (lowercase tags — `<div>`, `<button>`, etc. — not
 * `<MyComponent>`, since custom-component props aren't guaranteed to reach
 * the actual DOM node), so next-api-debugger's Inspector can read the exact
 * source location directly off the DOM instead of depending on React's
 * runtime internals.
 *
 * That dependency is worth avoiding on two counts:
 *   1. React 19 removed `_debugSource`; runtime fiber metadata does not
 *      reliably identify the JSX file in current Next.js apps.
 *   2. Even where `_debugSource` IS attached, React renders in two
 *      disconnected phases — render (where your component runs) and commit
 *      (where DOM nodes actually get created) — so a stack trace captured
 *      at DOM-creation time can never reach back into your component's own
 *      call frames, only React's internal reconciler.
 * A build-time-injected attribute has neither problem: it's baked into the
 * DOM directly, with no runtime framework involvement at inspection time.
 *
 * Usage — add to your Babel config (babel.config.js / .babelrc):
 *
 *   module.exports = {
 *     presets: [...your existing presets],
 *     plugins: [
 *       (process.env.NODE_ENV !== 'production' ||
 *         process.env.NEXT_PUBLIC_API_DEBUGGER_ENABLED === 'true') &&
 *         'next-api-debugger/babel-plugin',
 *     ].filter(Boolean),
 *   };
 *
 * With webpack, a Babel config switches Next.js app JavaScript compilation
 * from SWC to Babel. Next.js 16 Turbopack supports Babel configs directly.
 * Keep the plugin opt-in, since it changes the consuming app's build setup.
 */
module.exports = function apiDebuggerSourcePlugin({ types: t }) {
  return {
    name: 'next-api-debugger-source',
    visitor: {
      JSXOpeningElement(elPath, state) {
        const nameNode = elPath.node.name;
        const isHostElement = nameNode && nameNode.type === 'JSXIdentifier' && /^[a-z]/.test(nameNode.name);
        if (!isHostElement) return;

        const loc = elPath.node.loc;
        if (!loc) return;

        const alreadyTagged = elPath.node.attributes.some(
          (attr) => attr.type === 'JSXAttribute' && attr.name && attr.name.name === 'data-apd-source'
        );
        if (alreadyTagged) return;

        const filename = state.filename || (state.file && state.file.opts && state.file.opts.filename) || 'unknown';
        const root = state.cwd || (state.file && state.file.opts && state.file.opts.cwd) || process.cwd();
        const relative = path.relative(root, filename).split(path.sep).join('/');

        const value = `${relative}:${loc.start.line}:${loc.start.column + 1}`;
        elPath.node.attributes.push(t.jsxAttribute(t.jsxIdentifier('data-apd-source'), t.stringLiteral(value)));
      },
    },
  };
};
