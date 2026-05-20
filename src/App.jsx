import { useState } from "react";
import "./App.css";

export default function App() {

  const [department, setDepartment] = useState("");
  const [technology, setTechnology] = useState("");
  const [level, setLevel] = useState("");

  return (

    <div className="page">

      <div className="container">

        {/* HEADER */}
        <div className="header">

          <h1>AI Project Idea Generator</h1>

          <p>
            Generate complete engineering projects using AI
          </p>

        </div>

        {/* DEPARTMENT */}
        <div className="field">

          <label>Department</label>

          <input
            type="text"
            placeholder="Example: ECE"
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
            }
          />

        </div>

        {/* TECHNOLOGY */}
        <div className="field">

          <label>Technology</label>

          <input
            type="text"
            placeholder="Example: AI, IoT, Cloud"
            value={technology}
            onChange={(e) =>
              setTechnology(e.target.value)
            }
          />

        </div>

        {/* DIFFICULTY */}
        <div className="field">

          <label>Difficulty</label>

          <select
            value={level}
            onChange={(e) =>
              setLevel(e.target.value)
            }
          >

            <option>Medium</option>
            <option>Easy</option>
            <option>Hard</option>

          </select>

        </div>

        {/* BUTTON */}
        <button className="generate-btn">
          Generate Project
        </button>

      </div>

    </div>
  );
}