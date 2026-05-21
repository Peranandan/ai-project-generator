import { useState } from "react";

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

      if (data.response) {

        setResult(data.response);

      }
      else if (data.detail) {

        setResult(data.detail);

      }
      else {

        setResult("No response generated.");

      }

    } catch (err) {

      setResult("Backend connection failed.");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="page">

      <div className="container">

        {/* HERO */}

        <section className="hero">

          <div className="hero-grid">

            {/* LEFT */}

            <div className="hero-left">

              <div className="badge">
                ⚡ AI Powered Engineering Assistant
              </div>

              <h1>
                Generate Engineering Projects Using AI
              </h1>

              <p>
                Create innovative engineering projects,
                architecture, implementation steps,
                and code instantly using AI technology.
              </p>

              <button
                className="hero-btn"
                onClick={generateProject}
              >
                🚀 Start Generating
              </button>

            </div>

            {/* RIGHT */}

            <div className="hero-right">

              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop"
                alt="AI Dashboard"
              />

            </div>

          </div>

        </section>

        {/* FORM */}

        <section className="form-card">

          <div className="form-grid">

            <div className="field">

              <label>
                Department
              </label>

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

              <label>
                Technology
              </label>

              <input
                type="text"
                placeholder="e.g. AI, IoT, Blockchain"
                value={technology}
                onChange={(e) =>
                  setTechnology(e.target.value)
                }
              />

            </div>

            <div className="field">

              <label>
                Difficulty Level
              </label>

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

          </div>

          <button
            className="generate-btn"
            onClick={generateProject}
            disabled={loading}
          >

            {
              loading
              ? "Generating..."
              : "⚡ Generate Project"
            }

          </button>

        </section>

        {/* FEATURES */}

        <section className="features">

          <div className="feature-box">

            <h3>
              ⚡ AI Generated
            </h3>

            <p>
              Generate complete engineering
              project ideas instantly.
            </p>

          </div>

          <div className="feature-box">

            <h3>
              📚 Smart Workflow
            </h3>

            <p>
              Save research time with AI-powered
              project planning assistance.
            </p>

          </div>

          <div className="feature-box">

            <h3>
              🚀 Modern Technologies
            </h3>

            <p>
              Supports AI, ML, IoT, Cloud,
              Blockchain, Robotics, and more.
            </p>

          </div>

        </section>

        {/* RESULT */}

        {
          result && (

            <div className="result-box">

              <pre>
                {result}
              </pre>

            </div>

          )
        }

      </div>

    </div>

  );
}