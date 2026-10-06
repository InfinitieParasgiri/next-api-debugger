const test = require('node:test');
const assert = require('node:assert/strict');
const { debugServerFetch, getServerLogs } = require('../dist/server.js');

test('public detail capture redacts private fields and preserves the response', async () => {
  const originalFetch = global.fetch;
  global.fetch = async () => new Response(JSON.stringify({ data: { title: 'Public story', access_token: 'secret' } }), {
    headers: { 'content-type': 'application/json', 'set-cookie': 'secret=1', 'x-request-id': 'request-1' },
  });
  try {
    const sessionId = crypto.randomUUID();
    const response = await debugServerFetch(sessionId, 'https://example.test/explore?type=audio&token=secret', {
      headers: { accept: 'application/json', authorization: 'Bearer secret' },
    }, { captureDetails: true });
    assert.equal((await response.json()).data.title, 'Public story');
    const log = getServerLogs(sessionId)[0];
    assert.equal(log.queryParams.type, 'audio');
    assert.equal(log.queryParams.token, '[redacted]');
    assert.equal(log.requestHeaders.authorization, undefined);
    assert.equal(log.responseHeaders['set-cookie'], undefined);
    assert.equal(log.responseHeaders['x-request-id'], 'request-1');
    assert.equal(log.responseBody.data.title, 'Public story');
    assert.equal(log.responseBody.data.access_token, '[redacted]');

    const defaultSession = crypto.randomUUID();
    await debugServerFetch(defaultSession, 'https://example.test/explore?type=audio');
    const defaultLog = getServerLogs(defaultSession)[0];
    assert.equal(defaultLog.queryParams.type, '[redacted]');
    assert.equal(defaultLog.responseBodyRaw, null);
  } finally {
    global.fetch = originalFetch;
  }
});

test('large response previews stop at the limit without blocking the original response', { timeout: 3000 }, async () => {
  const originalFetch = global.fetch;
  global.fetch = async () => new Response(JSON.stringify({ data: 'x'.repeat(100000) }), {
    headers: { 'content-type': 'application/json' },
  });
  try {
    const sessionId = crypto.randomUUID();
    const response = await debugServerFetch(sessionId, 'https://example.test/large', undefined, { captureDetails: true });
    assert.equal((await response.json()).data.length, 100000);
    const log = getServerLogs(sessionId)[0];
    assert.equal(log.responseSize, 32768);
    assert.match(log.responseBodyRaw, /\[truncated\]$/);
  } finally {
    global.fetch = originalFetch;
  }
});
