const urls = new Map();

function saveShortUrl(code, originalUrl, expiry) {
  urls.set(code, {
    originalUrl,
    expiry,
    createdAt: new Date(),
    clicks: [],
  });
}

function getUrl(code) {
  return urls.get(code);
}

function recordClick(code, meta) {
  const entry = urls.get(code);
  if (entry) {
    entry.clicks.push(meta);
  }
}

module.exports = { saveShortUrl, getUrl, recordClick };
