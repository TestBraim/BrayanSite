const MAX_BODY_BYTES = 1024 * 1024;

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const domain = process.env.GOOGLE_TAG_ID;
  if (!/^g-[a-z0-9]+\.fps\.goog$/.test(domain || '')) {
    res.statusCode = 503;
    return res.end('Gateway not configured');
  }
  if (!['GET', 'HEAD', 'POST', 'OPTIONS'].includes(req.method)) {
    res.setHeader('Allow', 'GET, HEAD, POST, OPTIONS');
    res.statusCode = 405;
    return res.end();
  }

  try {
    const incoming = new URL(req.url, 'https://gateway.invalid');
    const suffix = incoming.pathname.startsWith('/metrics/')
      ? incoming.pathname.slice('/metrics/'.length)
      : incoming.searchParams.get('__gateway_path') || '';
    incoming.searchParams.delete('__gateway_path');
    const target = new URL(`https://${domain}/metrics/`);
    target.pathname += suffix === 'gtag/js' ? '' : suffix;
    target.search = incoming.search;
    if (!target.pathname.startsWith('/metrics/')) {
      res.statusCode = 400;
      return res.end('Invalid gateway path');
    }

    const headers = new Headers();
    for (const name of ['accept', 'accept-language', 'content-type', 'user-agent', 'referer', 'origin']) {
      const value = req.headers[name];
      if (typeof value === 'string') headers.set(name, value);
    }
    const cookies = (req.headers.cookie || '').split(';').filter((cookie) =>
      /^(?:_ga(?:_[A-Za-z0-9]+)?|_gid|_gat(?:_[A-Za-z0-9]+)?|_gcl_[A-Za-z0-9]+)=/.test(cookie.trim())
    ).join(';');
    if (cookies) headers.set('cookie', cookies);
    const country = req.headers['x-vercel-ip-country'];
    const region = req.headers['x-vercel-ip-country-region'];
    if (/^[A-Z]{2}$/.test(country || '')) headers.set('X-Forwarded-Country', country);
    if (/^[A-Z0-9-]{1,10}$/.test(region || '')) headers.set('X-Forwarded-Region', region);
    const latitude = req.headers['x-vercel-ip-latitude'];
    const longitude = req.headers['x-vercel-ip-longitude'];
    const city = req.headers['x-vercel-ip-city'];
    if (latitude && longitude && Number.isFinite(Number(latitude)) && Number.isFinite(Number(longitude))) {
      headers.set('X-Forwarded-Geolocation', `latlong=${Number(latitude)},${Number(longitude)}${city ? `;city=${encodeURIComponent(decodeURIComponent(city))}` : ''}`);
    }

    let body;
    if (req.method === 'POST') {
      const chunks = [];
      let length = 0;
      for await (const chunk of req) {
        const buffer = Buffer.from(chunk);
        length += buffer.length;
        if (length > MAX_BODY_BYTES) {
          res.statusCode = 413;
          return res.end('Payload too large');
        }
        chunks.push(buffer);
      }
      body = Buffer.concat(chunks);
    }

    const upstream = await fetch(target, {
      method: req.method,
      headers,
      body,
      redirect: 'error',
      signal: AbortSignal.timeout(10000),
    });
    const payload = req.method === 'HEAD' ? null : Buffer.from(await upstream.arrayBuffer());
    res.statusCode = upstream.status;
    for (const name of ['content-type', 'content-language', 'vary', 'allow']) {
      const value = upstream.headers.get(name);
      if (value) res.setHeader(name, value);
    }
    const setCookies = upstream.headers.getSetCookie();
    if (setCookies.length) res.setHeader('Set-Cookie', setCookies);
    return res.end(payload);
  } catch (error) {
    res.statusCode = error.name === 'TimeoutError' ? 504 : 502;
    return res.end('Gateway upstream unavailable');
  }
};
