const axios = require("axios");

const API_URL = "http://20.244.56.144/evaluation-service/logs";
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMjEyMDg3QG5lYy5lZHUuaW4iLCJleHAiOjE3NTU2NzA1NTQsImlhdCI6MTc1NTY2OTY1NCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImY2ODA3YjMxLTI3ZWEtNDVlNC05NmJiLWNkMzRmMDI2OGJmMyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFzaHdhbnRoIHJhaiBhIiwic3ViIjoiNjBhNGU4OWQtNWMwYy00ZjU2LWE0OTUtZWM2NTgzMWMzZmMwIn0sImVtYWlsIjoiMjIxMjA4N0BuZWMuZWR1LmluIiwibmFtZSI6ImFzaHdhbnRoIHJhaiBhIiwicm9sbE5vIjoiMjIxMjA4NyIsImFjY2Vzc0NvZGUiOiJ4c1pUVG4iLCJjbGllbnRJRCI6IjYwYTRlODlkLTVjMGMtNGY1Ni1hNDk1LWVjNjU4MzFjM2ZjMCIsImNsaWVudFNlY3JldCI6InBmZ1RTRmpoUUViWFptSGcifQ.4X7Rx2N5mDcj78g-Q5ZItT3mS-Nzb_IchBX9OWzlOxI";

async function logger(stack, level, pkg, message) {
  try {
    const res = await axios.post(
      API_URL,
      { stack, level, package: pkg, message },
      { headers: { Authorization: TOKEN } }
    );
    return res.data;
  } catch (err) {
    console.error("Log Error:", err.message);
  }
}

module.exports = logger;
