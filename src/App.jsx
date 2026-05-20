import { useState } from "react";
import "./markdown.css";

export default function App() {

  const [department, setDepartment] = useState("");
  const [technology, setTechnology] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const API_URL =
    "https://ai-project-backend-pcuo.onrender.com/generate";

  const generateProject = async () => {

    if (!department || !technology || !level) {
      alert("Please fill all fields");
      return;
    }

    const message =
      `Dept:${department} Tech:${technology} Level:${level} project`;

    try {
      setLoading(true);
      setResult("");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      console.log(data);

      if (data.success) {
        setResult(data.response);
      } else {
        alert(data.detail || "Something went wrong");
      }

    } catch (error) {
      console.log(error);
      alert("Backend connection failed");
    } finally {
      setLoading(false);
    }
  };

  const parseResult = (text) => {
    return text.split("\n").filter(Boolean);
  };

  return (
    <div className="page">
      <div className="container">

        {/* HEADER */}
        <div className="header">
          <h1>AI Project Generator</h1>
          <p>Generate complete engineering projects using AI</p>
        </div>

        {/* FORM */}
        <div className="form">

          {/* DEPARTMENT */}
          <div className="field">
            <label>Department</label>
            <input
              type="text"
              placeholder="Example: CSE"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          {/* TECHNOLOGY */}
          <div className="field">
            <label>Technology</label>
            <input
              type="text"
              placeholder="Example: AI, IoT"
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
            />
          </div>

          {/* LEVEL */}
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

          {/* BUTTON */}
          <button
            className="generate-btn"
            onClick={generateProject}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Project"}
          </button>

        </div>

        {/* RESULT */}
        {result && (
          <div className="result-box">
            {parseResult(result).map((line, i) => {

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
                const [label, ...rest] = line.split(":");
                return (
                  <div key={i} className="result-section">
                    <span className="result-label">{label}:</span>
                    {rest.join(":").trim() && (
                      <span className="result-value">
                        {rest.join(":").trim()}
                      </span>
                    )}
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
            })}
          </div>
        )}

      </div>
    </div>
  );
}