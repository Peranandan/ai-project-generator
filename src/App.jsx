import "./markdown.css";

export default function App() {

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
            />

          </div>

          {/* Difficulty */}
          <div className="field">

            <label>
              Difficulty
            </label>

            <select>

              <option>
                Medium
              </option>

              <option>
                Easy
              </option>

              <option>
                Hard
              </option>

            </select>

          </div>

          {/* BUTTON */}
          <button className="generate-btn">

            Generate Project

          </button>

        </div>

      </div>

    </div>
  );
}