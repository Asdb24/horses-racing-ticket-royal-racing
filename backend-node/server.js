import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 4000;
const JAVA_API_BASE = process.env.JAVA_API_BASE || "http://localhost:8080/api";

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "royal-racing-node-api" });
});

app.get("/api/races", async (_req, res) => {
  try {
    const response = await fetch(`${JAVA_API_BASE}/races`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(502).json({
      error: "JAVA_BACKEND_UNAVAILABLE",
      message: "Java service is not reachable.",
    });
  }
});

app.post("/api/tickets", async (req, res) => {
  try {
    const response = await fetch(`${JAVA_API_BASE}/tickets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(502).json({
      error: "JAVA_BACKEND_UNAVAILABLE",
      message: "Java service is not reachable.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Node API listening on port ${PORT}`);
});
