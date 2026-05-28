const express = require("express");
const cors = require("cors");
const os = require("os");

const app = express();

app.use(cors());

const PORT = 5000;
const VERSION = "v1.0.0";

app.get("/", (req, res) => {
  res.send("KubeHealth Backend Running");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
  });
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "Healthy",
    version: VERSION,
    uptime: `${Math.floor(process.uptime())} seconds`,
    hostname: os.hostname(),
    timestamp: new Date(),
    environment: "Production",
  });
});

app.get("/api/logs", (req, res) => {
  res.json([
    {
      level: "INFO",
      message: "Container Started Successfully",
    },
    {
      level: "INFO",
      message: "Health Check Passed",
    },
    {
      level: "SUCCESS",
      message: "Connected to Kubernetes Cluster",
    },
    {
      level: "RUNNING",
      message: "Application Running Normally",
    },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
