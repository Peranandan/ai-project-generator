import { useState } from "react";
import "./markdown.css";

export default function App() {

  const [department, setDepartment] = useState("");
  const [technology, setTechnology] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const API_URL = "https://ai-project-backend-pcuo.onrender.com/generate";

  const generateProject = async () => {

    if (!department || !technology || !level) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setResult("");

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          department,
          technology,
          level,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (data.success) {
        setResult(data.result);
      } else {
        alert(data.detail || "Something went wrong");
      }

    } catch (err) {
      console.log(err);
      alert("Backend connection failed");
    } finally {
      setLoading(false);
    }
  };

  const renderResult = (text) => {
    return text.split("\n").filter(Boolean).map((line, i) => {

      if (line.startsWith("Project Title:")) {
        return (
          <div key={i} className="result-title">
            {line.replace("Project Title:", "").trim()}
          </div>
        );
      }

      if (
        line.startsWith("Components:") ||
        line.startsWith("Description:") ||
        line.startsWith("Steps:")
      ) {
        const colon = line.indexOf(":");
        const label = line.slice(0, colon);
        const value = line.slice(colon + 1).trim();
        return (
          <div key={i} className="result-section">
            <span className="result-label">{label}:</span>
            {value && <span className="result-value"> {value}</span>}
          </div>
        );
      }

      if (/^\d+\./.test(line)) {
        return (
          <div key={i} className="result-step">
            {line}
          </div>
        );
      }

      return (
        <div key={i} className="result-line">
          {line}
        </div>
      );
    });
  };

  return (
    <div className="page">
      <div className="container">

        <div className="header">
          <h1>AI Project Generator</h1>
          <p>Generate complete engineering projects using AI</p>
        </div>

        <div className="form">

          <div className="field">
            <label>Department</label>
            <input
              type="text"
              placeholder="Example: CSE"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Technology</label>
            <input
              type="text"
              placeholder="Example: AI, IoT"
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Difficulty</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">Select Difficulty</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <button
            className="generate-btn"
            onClick={generateProject}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Project"}
          </button>

        </div>

        {result && (
          <div className="result-box">
            {renderResult(result)}
          </div>
        )}

      </div>
    </div>
  );
}