const { test, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const { Readable } = require('node:stream');
const handler = require('../api/metrics');
const originalFetch = global.fetch;
const originalDomain = process.env.GOOGLE_TAG_ID;
afterEach(() => {
  global.fetch = originalFetch;
  if (originalDomain === undefined) delete process.env.GOOGLE_TAG_ID;
  else process.env.GOOGLE_TAG_ID = originalDomain;
});
async function request(url, { method = 'GET', headers = {}, body = '' } = {}) {
  const req = Readable.from(body ? [Buffer.from(body)] : []);
  Object.assign(req, { url, method, headers });
  const res = { headers: {}, setHeader(k, v) { this.headers[k.toLowerCase()] = v; }, end(body) { this.body = body; } };
  await handler(req, res);
  return res;
}
function setup(callback) {
  process.env.GOOGLE_TAG_ID = 'g-6bpjblhpnr.fps.goog';
  global.fetch = callback || (async () => new Response('ok'));
}
test('retains rewritten path and all measurement query parameters', async () => {
  setup(async (url) => {
    assert.equal(url.href, 'https://g-6bpjblhpnr.fps.goog/metrics/g/collect?v=2&tid=G-TEST');
    return new Response(null, { status: 204 });
  });
  const res = await request('/api/metrics?__gateway_path=g/collect&v=2&tid=G-TEST');
  assert.equal(res.statusCode, 204);
  assert.equal(res.headers['cache-control'], 'no-store');
});
test('maps the script alias to the documented gateway endpoint', async () => {
  setup(async (url) => {
    assert.equal(url.href, 'https://g-6bpjblhpnr.fps.goog/metrics/?id=G-6BPJBLHPNR');
    return new Response('script', { headers: { 'Content-Type': 'application/javascript' } });
  });
  const res = await request('/metrics/gtag/js?id=G-6BPJBLHPNR');
  assert.equal(res.body.toString(), 'script');
  assert.equal(res.headers['content-type'], 'application/javascript');
});
test('preserves POST bytes and geo while stripping unrelated credentials', async () => {
  setup(async (url, options) => {
    assert.equal(options.body.toString(), 'a=1\nb=2');
    assert.equal(options.headers.get('X-Forwarded-Country'), 'BR');
    assert.equal(options.headers.get('X-Forwarded-Region'), 'DF');
    assert.equal(options.headers.get('authorization'), null);
    assert.equal(options.headers.get('cookie'), '_ga=123');
    assert.equal(options.headers.get('x-forwarded-countryregion'), null);
    return new Response(null, { status: 204 });
  });
  await request('/metrics/g/collect', { method: 'POST', body: 'a=1\nb=2', headers: {
    'x-vercel-ip-country': 'BR', 'x-vercel-ip-country-region': 'DF',
    'x-forwarded-countryregion': 'fake', authorization: 'private', cookie: '_ga=123; session=secret',
  } });
});
test('rejects unconfigured or arbitrary upstream domains', async () => {
  process.env.GOOGLE_TAG_ID = 'evil.example';
  global.fetch = () => { throw new Error('Must not fetch'); };
  assert.equal((await request('/metrics/healthy')).statusCode, 503);
});
test('reports upstream failures', async () => {
  setup(async () => { throw new Error('offline'); });
  assert.equal((await request('/metrics/healthy')).statusCode, 502);
});
test('limits request body size', async () => {
  setup(() => { throw new Error('Must not fetch'); });
  assert.equal((await request('/metrics/g/collect', { method: 'POST', body: 'x'.repeat(1024 * 1024 + 1) })).statusCode, 413);
});
