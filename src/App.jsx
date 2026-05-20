import { useState } from "react";
import "./markdown.css";

export default function App() {

  // =========================
  // STATES
  // =========================
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
  // BACKEND API URL
  // =========================
  const API_URL =
    "https://ai-project-backend-pcuo.onrender.com/generate";

  // =========================
  // GENERATE PROJECT
  // =========================
  const generateProject = async () => {

    // VALIDATION
    if (
      !department ||
      !technology ||
      !level
    ) {

      alert(
        "Please fill all fields"
      );

      return;
    }

    try {

      setLoading(true);

      setResult("");

      // API REQUEST
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

      // SUCCESS
      if (data.success) {

        setResult(
          data.result
        );

      } else {

        alert(
          data.error
        );
      }

    } catch (error) {

      console.log(error);

      alert(
        "Backend connection failed"
      );

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // UI
  // =========================
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

          {/* DEPARTMENT */}
          <div className="field">

            <label>
              Department
            </label>

            <input
              type="text"

              placeholder=
              "Example: CSE"

              value={department}

              onChange={(e) =>
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

              placeholder=
              "Example: AI, IoT"

              value={technology}

              onChange={(e) =>
                setTechnology(
                  e.target.value
                )
              }
            />

          </div>

          {/* LEVEL */}
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

            onClick={
              generateProject
            }
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