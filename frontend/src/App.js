import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [statusData, setStatusData] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://34.93.50.201:5000/api/status")
        .then((res) => res.json())
        .then((data) => setStatusData(data))
        .catch((err) => console.error("Status API Error:", err));

      fetch("http://34.93.50.201:5000/api/logs")
        .then((res) => res.json())
        .then((data) => setLogs(data))
        .catch((err) => console.error("Logs API Error:", err));
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>KubeHealth Dashboard</h1>

      {statusData && (
        <div className="card-container">
          <div className="card">
            <h2>Status</h2>
            <p className="healthy">{statusData.status}</p>
          </div>

          <div className="card">
            <h2>Version</h2>
            <p>{statusData.version}</p>
          </div>

          <div className="card">
            <h2>Uptime</h2>
            <p>{statusData.uptime}</p>
          </div>

          <div className="card">
            <h2>Hostname</h2>
            <p>{statusData.hostname}</p>
          </div>

          <div className="card">
            <h2>Environment</h2>
            <p>{statusData.environment}</p>
          </div>

          <div className="card">
            <h2>Timestamp</h2>
            <p>{new Date(statusData.timestamp).toLocaleString()}</p>
          </div>
        </div>
      )}

      <div className="logs-section">
        <h2>Deployment Logs</h2>

        {logs.map((log, index) => (
          <div key={index} className="log">
            {typeof log === "string"
              ? log
              : `[${log.level}] ${log.message}`}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;