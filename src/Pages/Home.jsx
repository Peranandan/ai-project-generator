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
                Build innovative engineering
                projects, architecture,
                workflows, implementation plans,
                and technical documentation
                instantly using advanced
                artificial intelligence tools.
              </p>

              <button className="hero-btn">
                Explore Platform
              </button>

            </div>

            {/* RIGHT */}

            <div className="hero-right">

              <img
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1400&auto=format&fit=crop"
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

        {/* FEATURES */}

        <section className="features">

          <div className="feature-box">

            <h3>
              AI Project Ideas
            </h3>

            <p>
              Generate innovative engineering
              project ideas instantly based
              on your department and
              technology stack.
            </p>

          </div>

          <div className="feature-box">

            <h3>
              Architecture Planning
            </h3>

            <p>
              Get workflows, modules,
              architecture design,
              implementation strategy,
              and development guidance.
            </p>

          </div>

          <div className="feature-box">

            <h3>
              Advanced Technologies
            </h3>

            <p>
              Supports Artificial Intelligence,
              Cloud Computing, IoT,
              Cybersecurity, Robotics,
              and Machine Learning.
            </p>

          </div>

        </section>

        {/* SAMPLE PROJECTS */}

        <section
          className="features"
          style={{ marginTop:"40px" }}
        >

          <div className="feature-box">

            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
              alt="AI Chatbot"
              style={{
                width:"100%",
                height:"180px",
                objectFit:"cover",
                borderRadius:"18px",
                marginBottom:"18px",
              }}
            />

            <h3>
              AI Chatbot Assistant
            </h3>

            <p>
              Intelligent customer support
              chatbot using Natural Language
              Processing and Machine Learning.
            </p>

          </div>

          <div className="feature-box">

            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop"
              alt="Traffic System"
              style={{
                width:"100%",
                height:"180px",
                objectFit:"cover",
                borderRadius:"18px",
                marginBottom:"18px",
              }}
            />

            <h3>
              Smart Traffic System
            </h3>

            <p>
              AI-powered traffic monitoring
              and smart signal management
              using computer vision.
            </p>

          </div>

          <div className="feature-box">

            <img
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1200&auto=format&fit=crop"
              alt="Smart Farming"
              style={{
                width:"100%",
                height:"180px",
                objectFit:"cover",
                borderRadius:"18px",
                marginBottom:"18px",
              }}
            />

            <h3>
              IoT Smart Farming
            </h3>

            <p>
              Smart agriculture system
              using IoT sensors for
              automated irrigation and
              crop monitoring.
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