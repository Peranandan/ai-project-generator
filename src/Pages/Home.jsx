import { useState } from "react";
import "./markdown.css";

export default function Home() {
  const [department, setDepartment] = useState("");
  const [technology, setTechnology] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const API_URL =
    "https://ai-project-backend-pcuo.onrender.com/chat";

  const generateProject = async () => {
    if (!department || !technology || !level) {
      alert("Please fill all fields");
      return;
    }

    const message = `Dept:${department} Tech:${technology} Level:${level} project`;

    try {
      setLoading(true);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      setResult(data.response || "No response");
    } catch (err) {
      console.error(err);
      alert("Backend connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">

        <div className="header">
          <div className="header-icon">⚡</div>

          <h1>AI Project Generator</h1>

          <p>
            Generate complete engineering projects
            using AI
          </p>
        </div>

        <div className="form">

          <div className="field">
            <label>Department</label>

            <input
              type="text"
              placeholder="e.g. CSE"
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
            />
          </div>

          <div className="field">
            <label>Technology</label>

            <input
              type="text"
              placeholder="e.g. AI"
              value={technology}
              onChange={(e) =>
                setTechnology(e.target.value)
              }
            />
          </div>

          <div className="field">
            <label>Difficulty</label>

            <select
              value={level}
              onChange={(e) =>
                setLevel(e.target.value)
              }
            >
              <option value="">
                Select Difficulty
              </option>

              <option value="Easy">
                Easy
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Hard">
                Hard
              </option>
            </select>
          </div>

          <button
            className="generate-btn"
            onClick={generateProject}
            disabled={loading}
          >
            {loading
              ? "Generating..."
              : "⚡ Generate Project"}
          </button>

        </div>

        {result && (
          <div className="result-box">
            <pre>{result}</pre>
          </div>
        )}

      </div>
    </div>
  );
}