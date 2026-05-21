import { useState } from "react";

export default function Home() {

  const [department, setDepartment] =
    useState("");

  const [technology, setTechnology] =
    useState("");

  const [level, setLevel] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState("");

  const API_URL =
    "https://ai-project-backend-pcuo.onrender.com/chat";

  const generateProject = async () => {

    if (
      !department ||
      !technology ||
      !level
    ) {
      alert("Please fill all fields");
      return;
    }

    const message =
      `Dept:${department} Tech:${technology} Level:${level} project`;

    try {

      setLoading(true);

      const res = await fetch(API_URL, {

        method:"POST",

        headers:{
          "Content-Type":"application/json",
        },

        body:JSON.stringify({
          message,
        }),

      });

      const data = await res.json();

      if(data.response){

        setResult(data.response);

      } else if(data.detail){

        setResult(data.detail);

      } else {

        setResult(
          "No response generated."
        );

      }

    } catch(err){

      console.error(err);

      setResult(
        "Backend connection failed."
      );

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

              <span className="badge">
                ⚡ AI Powered Engineering Platform
              </span>

              <h1>
                Generate Engineering
                Projects Using AI
              </h1>

              <p>
                Create innovative engineering
                project ideas, architecture,
                workflows, implementation plans,
                and documentation instantly using
                advanced artificial intelligence.
              </p>

              <button className="hero-btn">
                Start Generating
              </button>

            </div>

            {/* RIGHT */}

            <div className="hero-right">

              <img
                src="https://images.unsplash.com/photo-1675557009875-436f5f8f4c78?q=80&w=1400&auto=format&fit=crop"
                alt="AI Robot"
              />

            </div>

          </div>

        </section>

        {/* FORM */}

        <section className="form-card">

          <div className="form-grid">

            {/* DEPARTMENT */}

            <div className="field">

              <label>
                Department
              </label>

              <input
                type="text"
                placeholder="e.g. CSE"
                value={department}
                onChange={(e)=>
                  setDepartment(
                    e.target.value
                  )
                }
              />

            </div>

            {/* TECHNOLOGY */}

            <div className="field">

              <label>
                Technology
              </label>

              <input
                type="text"
                placeholder="e.g. AI, IoT, Cloud"
                value={technology}
                onChange={(e)=>
                  setTechnology(
                    e.target.value
                  )
                }
              />

            </div>

            {/* LEVEL */}

            <div className="field">

              <label>
                Difficulty Level
              </label>

              <select
                value={level}
                onChange={(e)=>
                  setLevel(
                    e.target.value
                  )
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

            {/* BUTTON */}

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

          </div>

        </section>

        {/* FEATURES */}

        <section className="features">

          <div className="feature-box">

            <h3>
              Smart AI Generation
            </h3>

            <p>
              Generate complete engineering
              projects instantly using
              advanced AI technology with
              detailed implementation guidance.
            </p>

          </div>

          <div className="feature-box">

            <h3>
              Multiple Technologies
            </h3>

            <p>
              Supports AI, IoT, Cloud,
              Blockchain, Robotics,
              Embedded Systems,
              Web Development, and more.
            </p>

          </div>

          <div className="feature-box">

            <h3>
              Architecture & Workflow
            </h3>

            <p>
              Get project architecture,
              components, workflows,
              modules, and implementation
              planning automatically.
            </p>

          </div>

        </section>

        {/* RESULT */}

        {
          result && (

            <section className="result-box">

              <pre>
                {result}
              </pre>

            </section>

          )
        }

      </div>

    </div>
  );
}