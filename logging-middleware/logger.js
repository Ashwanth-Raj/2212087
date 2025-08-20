const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "app.log");

function logger(req, res, next) {
  const logEntry = {
    time: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    body: req.body,
    headers: req.headers,
  };
  fs.appendFile(logFile, JSON.stringify(logEntry) + "\n", (err) => {
    if (err) {
      console.error("Failed to write log:", err);
    }
  });
  next();
}

module.exports = logger;
