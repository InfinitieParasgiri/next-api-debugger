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
 *   1. Next.js's SWC compiler does not reliably attach React's own
 *      `_debugSource` debug info in dev, even when explicitly configured
 *      to (a currently open Next.js issue, not something fixable from
 *      outside Next.js itself).
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
 *       process.env.NODE_ENV !== 'production' && 'next-api-debugger/babel-plugin',
 *     ].filter(Boolean),
 *   };
 *
 * Note for Next.js specifically: adding *any* Babel config file switches
 * Next.js off its SWC compiler for the whole app (a Next.js behavior, not
 * this plugin's doing) — trading some dev-mode compile speed for guaranteed
 * accurate source locations in the Inspector. That trade-off is why this
 * lives as an opt-in plugin rather than something enabled by default.
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
