function generateCode(length = 6) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function calculateExpiry(minutes) {
  const now = new Date();
  now.setMinutes(now.getMinutes() + minutes);
  return now;
}

module.exports = { generateCode, calculateExpiry };
