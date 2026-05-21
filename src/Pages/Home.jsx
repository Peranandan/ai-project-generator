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

    if(
      !department ||
      !technology ||
      !level
    ){
      alert("Please fill all fields");
      return;
    }

    const message =
      `Generate ${level} level ${technology} engineering projects for ${department}`;

    try{

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

    } catch(error){

      console.error(error);

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

        {/* HERO SECTION */}

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
                Build innovative engineering
                projects, architecture,
                implementation plans,
                workflows, and technical
                documentation instantly
                using advanced AI technology.
              </p>

              <button className="hero-btn">

                Start Building

              </button>

            </div>

            {/* RIGHT IMAGE */}

            <div className="hero-right">

              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1400&auto=format&fit=crop"
                alt="AI Technology"
              />

            </div>

          </div>

        </section>

        {/* FORM SECTION */}

        <section className="form-card">

          <div className="form-grid">

            {/* DEPARTMENT */}

            <div className="field">

              <label>
                Department
              </label>

              <input
                type="text"
                placeholder="e.g. Computer Science"
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

            {/* DIFFICULTY */}

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
              AI Project Ideas
            </h3>

            <p>
              Generate smart and innovative
              engineering project ideas
              tailored to your department
              and technology stack.
            </p>

          </div>

          <div className="feature-box">

            <h3>
              Smart Architecture
            </h3>

            <p>
              Receive complete project
              workflows, modules,
              architecture planning,
              and implementation guidance.
            </p>

          </div>

          <div className="feature-box">

            <h3>
              Latest Technologies
            </h3>

            <p>
              Supports Artificial Intelligence,
              IoT, Cloud Computing,
              Cybersecurity, Blockchain,
              Robotics, and more.
            </p>

          </div>

        </section>

        {/* RESULT SECTION */}

        {
          result && (

            <section className="result-box">

              <h2
                style={{
                  marginBottom:"20px",
                  color:"#0f172a",
                }}
              >
                Generated Response
              </h2>

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