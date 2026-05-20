import { useState } from "react";
import "./App.css";

function CopyButton({ text }) {

  const [copied, setCopied] = useState(false);

  const copy = () => {

    navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1200);
  };

  return (
    <button
      className={`copy-btn ${copied ? "copied" : ""}`}
      onClick={copy}
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}

function Block({ title, content }) {

  return (
    <div className="block">

      <div className="block-head">

        <span className="block-title">
          {title}
        </span>

        <CopyButton text={content} />

      </div>

      <pre className="block-content">
        {content}
      </pre>

    </div>
  );
}

export default function App() {

  const [department, setDepartment] =
    useState("");

  const [technology, setTechnology] =
    useState("");

  const [level, setLevel] =
    useState("");

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const API_URL =
    import.meta.env.VITE_BACKEND_URL +
    "/generate";

  /* PARSE RESPONSE */
  const parse = (text, start, end) => {

    const regex = end
      ? new RegExp(
          `${start}:(.*?)${end}:`,
          "s"
        )
      : new RegExp(
          `${start}:(.*)`,
          "s"
        );

    return (
      text.match(regex)?.[1]?.trim() || ""
    );
  };

  /* GENERATE */
  const generate = async () => {

    if (
      !department ||
      !technology ||
      !level
    )
      return;

    setLoading(true);

    setResult(null);

    try {

      const res = await fetch(API_URL, {

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
      });

      const data = await res.json();

      const text = data.result;

      setResult({

        title: parse(
          text,
          "Title",
          "Explanation"
        ),

        explanation: parse(
          text,
          "Explanation",
          "Features"
        ),

        features: parse(
          text,
          "Features",
          "Implementation"
        ),

        implementation: parse(
          text,
          "Implementation",
          "Code"
        ),

        code: parse(text, "Code"),
      });

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="page">

      {/* WHITE BOX */}
      <div className="container">

        {/* HEADER */}
        <div className="header">

          <h1>
            AI Project Idea Generator
          </h1>

          <p>
            Generate complete engineering
            projects using AI
          </p>

        </div>

        {/* DEPARTMENT */}
        <div className="field">

          <label>
            Department
          </label>

          <select
            value={department}
            onChange={(e) =>
              setDepartment(
                e.target.value
              )
            }
          >

            <option value="">
              Example: ECE
            </option>

            <option value="CSE">
              CSE
            </option>

            <option value="ECE">
              ECE
            </option>

            <option value="IT">
              IT
            </option>

            <option value="EEE">
              EEE
            </option>

            <option value="MECH">
              MECH
            </option>

            <option value="CIVIL">
              CIVIL
            </option>

          </select>

        </div>

        {/* TECHNOLOGY */}
        <div className="field">

          <label>
            Technology
          </label>

          <select
            value={technology}
            onChange={(e) =>
              setTechnology(
                e.target.value
              )
            }
          >

            <option value="">
              Example: AI, IoT, Cloud
            </option>

            <option value="AI">
              AI
            </option>

            <option value="IoT">
              IoT
            </option>

            <option value="Cloud">
              Cloud
            </option>

            <option value="Cyber Security">
              Cyber Security
            </option>

            <option value="Blockchain">
              Blockchain
            </option>

          </select>

        </div>

        {/* DIFFICULTY */}
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
          onClick={generate}
          disabled={loading}
        >

          {loading
            ? "Generating..."
            : "Generate Project"}

        </button>

      </div>

      {/* OUTPUT */}
      {result && (

        <div className="output">

          <Block
            title="TITLE"
            content={result.title}
          />

          <Block
            title="EXPLANATION"
            content={result.explanation}
          />

          <Block
            title="FEATURES"
            content={result.features}
          />

          <Block
            title="IMPLEMENTATION"
            content={result.implementation}
          />

          <Block
            title="CODE"
            content={result.code}
          />

        </div>
      )}

    </div>
  );
}