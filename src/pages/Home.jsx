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

            {/* LEFT SIDE */}

            <div className="hero-left">

              <span className="badge">
                ⚡ AI Powered Engineering Platform
              </span>

              <h1>
                Generate Smart
                Engineering Projects
                Using AI
              </h1>

              <p>
                Build innovative engineering
                projects, workflows,
                implementation plans,
                architecture, and technical
                documentation instantly
                using advanced AI tools.
              </p>

              <button className="hero-btn">
                Explore Platform
              </button>

            </div>

            {/* RIGHT SIDE */}

            <div className="hero-right">

              <img
                src="https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1400&auto=format&fit=crop"
                alt="AI Technology"
              />

            </div>

          </div>

        </section>

        {/* PROJECT FORM */}

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

        {/* FEATURE SECTION */}

        <section className="features">

          <div className="feature-box">

            <h3>
              AI Project Ideas
            </h3>

            <p>
              Generate innovative engineering
              project ideas instantly
              based on your department,
              technology, and academic level.
            </p>

          </div>

          <div className="feature-box">

            <h3>
              Smart Architecture
            </h3>

            <p>
              Receive complete workflows,
              architecture planning,
              modules, implementation steps,
              and development guidance.
            </p>

          </div>

          <div className="feature-box">

            <h3>
              Latest Technologies
            </h3>

            <p>
              Supports AI, Machine Learning,
              Cloud Computing, IoT,
              Blockchain, Robotics,
              and Cybersecurity projects.
            </p>

          </div>

        </section>

        {/* SAMPLE PROJECTS */}

        <section className="features">

          <div className="feature-box">

            <h3>
              AI Chatbot Assistant
            </h3>

            <p>
              Intelligent chatbot system
              using NLP and Machine Learning
              for customer interaction.
            </p>

          </div>

          <div className="feature-box">

            <h3>
              Smart Traffic System
            </h3>

            <p>
              AI-powered traffic monitoring
              and signal optimization
              using computer vision.
            </p>

          </div>

          <div className="feature-box">

            <h3>
              IoT Smart Farming
            </h3>

            <p>
              Automated irrigation and
              crop monitoring system
              using IoT sensors.
            </p>

          </div>

        </section>

        {/* RESULT */}

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