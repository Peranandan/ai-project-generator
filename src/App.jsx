import { useState } from "react";
import "./App.css";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button className={`copy-btn ${copied ? "copied" : ""}`} onClick={copy}>
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}

function Block({ title, content }) {
  return (
    <div className="block">
      <div className="block-head">
        <span className="block-title">{title}</span>
        <CopyButton text={content} />
      </div>
      <pre className="block-content">{content}</pre>
    </div>
  );
}

export default function App() {
  const [department, setDepartment] = useState("");
  const [technology, setTechnology] = useState("");
  const [level, setLevel] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND_URL + "/generate";

  const parse = (text, start, end) => {
    const regex = end
      ? new RegExp(`${start}:(.*?)${end}:`, "s")
      : new RegExp(`${start}:(.*)`, "s");

    return text.match(regex)?.[1]?.trim() || "";
  };

  const generate = async () => {
    if (!department || !technology || !level) return;

    setLoading(true);
    setResult(null);

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ department, technology, level }),
    });

    const data = await res.json();
    const text = data.result;

    setResult({
      title: parse(text, "Title", "Explanation"),
      explanation: parse(text, "Explanation", "Features"),
      features: parse(text, "Features", "Implementation"),
      implementation: parse(text, "Implementation", "Code"),
      code: parse(text, "Code"),
    });

    setLoading(false);
  };

  const ready = department && technology && level;

  return (
    <div className="page">

      {/* HEADER */}
      <div className="header">
        <h1>AI Project Generator</h1>
        <p>Cost optimized AI tool for instant project ideas</p>
      </div>

      {/* INPUT SECTION */}
      <div className="input-card">

        <div className="grid">

          <div className="field">
            <label>Department</label>
            <select onChange={(e) => setDepartment(e.target.value)}>
              <option value="">Select</option>
              <option>CSE</option>
              <option>ECE</option>
              <option>IT</option>
              <option>EEE</option>
              <option>MECH</option>
              <option>CIVIL</option>
            </select>
          </div>

          <div className="field">
            <label>Technology</label>
            <select onChange={(e) => setTechnology(e.target.value)}>
              <option value="">Select</option>
              <option>AI</option>
              <option>IoT</option>
              <option>Cloud</option>
              <option>Cyber Security</option>
              <option>Blockchain</option>
            </select>
          </div>

          <div className="field">
            <label>Level</label>
            <select onChange={(e) => setLevel(e.target.value)}>
              <option value="">Select</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

        </div>

        <button
          className={`btn ${ready ? "active" : ""}`}
          onClick={generate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Project"}
        </button>

      </div>

      {/* OUTPUT */}
      {result && (
        <div className="output">

          <Block title="TITLE" content={result.title} />
          <Block title="EXPLANATION" content={result.explanation} />
          <Block title="FEATURES" content={result.features} />
          <Block title="IMPLEMENTATION" content={result.implementation} />
          <Block title="CODE" content={result.code} />

        </div>
      )}

    </div>
  );
}