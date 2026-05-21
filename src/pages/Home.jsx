import { useState } from "react";
import "../markdown.css";

export default function Home() {
  const [department, setDepartment] = useState("");
  const [technology, setTechnology] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const API_URL =
    "https://ai-project-backend-pcuo.onrender.com/chat";

  const generateProject = async () => {
    if (!department || !technology || !level) {
      alert("Please fill all fields");
      return;
    }

    const message =
      `Dept:${department} Tech:${technology} Level:${level} project`;

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

      if (data.success === false) {
        setResult(data.detail);
      }
      else if (data.response) {
        setResult(data.response);
      }
      else if (data.message) {
        setResult(data.message);
      }
      else {
        setResult("No response generated.");
      }

    } catch (error) {
      setResult("Backend connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">

        <div className="hero">

          <div className="hero-left">

            <div className="badge">
              ⚡ Powered by Advanced AI
            </div>

            <h1>
              AI Project Generator
            </h1>

            <p>
              Generate unique and innovative engineering
              projects tailored to your department,
              technology, and difficulty level.
            </p>

          </div>

        </div>

        <div className="form-card">

          <div className="form-grid">

            <div className="field">
              <label>Department</label>

              <input
                type="text"
                placeholder="Enter department (e.g. CSE)"
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
                placeholder="Enter technology (e.g. AI)"
                value={technology}
                onChange={(e) =>
                  setTechnology(e.target.value)
                }
              />
            </div>

            <div className="field">
              <label>Difficulty Level</label>

              <select
                value={level}
                onChange={(e) =>
                  setLevel(e.target.value)
                }
              >
                <option value="">
                  Select level
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

        <div className="features">

          <div className="feature-box">
            <h3>AI Powered</h3>
            <p>
              Advanced AI generates high quality
              engineering project ideas instantly.
            </p>
          </div>

          <div className="feature-box">
            <h3>Detailed Output</h3>
            <p>
              Get explanation, architecture,
              components, and sample code.
            </p>
          </div>

          <div className="feature-box">
            <h3>Time Saving</h3>
            <p>
              Reduce hours of research and planning
              using AI assistance.
            </p>
          </div>

          <div className="feature-box">
            <h3>Student Friendly</h3>
            <p>
              Designed specifically for engineering
              students and academic projects.
            </p>
          </div>

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