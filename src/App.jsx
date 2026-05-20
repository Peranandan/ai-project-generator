import { useState } from "react";
import "./markdown.css";

export default function App() {

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

  // =========================
  // YOUR RENDER BACKEND URL
  // =========================
  const API_URL =
    "https://ai-project-backend-pcuo.onrender.com/generate";

  // =========================
  // GENERATE FUNCTION
  // =========================
  const generateProject = async () => {

    if (
      !department ||
      !technology ||
      !level
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        API_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
            "application/json",
          },

          body: JSON.stringify({
            department,
            technology,
            level,
          }),
        }
      );

      const data =
        await response.json();

      console.log(data);

      if (data.success) {

        setResult(data.result);

      } else {

        alert(data.error);

      }

    } catch (error) {

      console.log(error);

      alert(
        "Backend not connected"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="page">

      <div className="container">

        {/* HEADER */}
        <div className="header">

          <h1>
            AI Project Generator
          </h1>

          <p>
            Generate complete engineering projects using AI
          </p>

        </div>

        {/* FORM */}
        <div className="form">

          {/* Department */}
          <div className="field">

            <label>
              Department
            </label>

            <input
              type="text"
              placeholder="Example: ECE"
              value={department}
              onChange={(e) =>
                setDepartment(
                  e.target.value
                )
              }
            />

          </div>

          {/* Technology */}
          <div className="field">

            <label>
              Technology
            </label>

            <input
              type="text"
              placeholder="Example: AI, IoT, Cloud"
              value={technology}
              onChange={(e) =>
                setTechnology(
                  e.target.value
                )
              }
            />

          </div>

          {/* Difficulty */}
          <div className="field">

            <label>
              Difficulty
            </label>

            <select
              value={level}
              onChange={(e) =>
                setLevel(
                  e.target.value
                )
              }
            >

              <option value="">
                Select Difficulty
              </option>

              <option>
                Easy
              </option>

              <option>
                Medium
              </option>

              <option>
                Hard
              </option>

            </select>

          </div>

          {/* BUTTON */}
          <button
            className="generate-btn"
            onClick={generateProject}
          >

            {loading
              ? "Generating..."
              : "Generate Project"}

          </button>

        </div>

        {/* RESULT */}
        {result && (

          <div className="result-box">

            <pre>
              {result}
            </pre>

          </div>

        )}

      </div>

    </div>
  );
}