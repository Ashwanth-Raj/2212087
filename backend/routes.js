const express = require("express");
const { saveShortUrl, getUrl, recordClick } = require("./storage");
const { generateCode, calculateExpiry } = require("./utils");

const router = express.Router();

router.post("/shorturls", (req, res) => {
  const { url, validity, shortcode } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const code = shortcode || generateCode();
  if (getUrl(code)) {
    return res.status(409).json({ error: "Shortcode already exists" });
  }

  const minutes = validity || 30;
  const expiry = calculateExpiry(minutes);

  saveShortUrl(code, url, expiry);

  return res.status(201).json({
    shortLink: `${req.protocol}://${req.get("host")}/${code}`,
    expiry: expiry.toISOString(),
  });
});

router.get("/:code", (req, res) => {
  const code = req.params.code;
  const data = getUrl(code);

  if (!data) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  if (new Date() > data.expiry) {
    return res.status(410).json({ error: "Link expired" });
  }

  recordClick(code, {
    time: new Date().toISOString(),
    referrer: req.get("referer") || "unknown",
    ip: req.ip,
  });

  return res.redirect(data.originalUrl);
});

router.get("/shorturls/:code", (req, res) => {
  const code = req.params.code;
  const data = getUrl(code);

  if (!data) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  return res.json({
    originalUrl: data.originalUrl,
    createdAt: data.createdAt,
    expiry: data.expiry,
    totalClicks: data.clicks.length,
    clicks: data.clicks,
  });
});

module.exports = router;
