import { useState } from "react";
import "./App.css";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button className={`copy-btn ${copied ? "copied" : ""}`} onClick={handleCopy}>
      {copied ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

function ResultBlock({ icon, label, content, isCode }) {
  return (
    <div className={`result-block ${isCode ? "code-block" : ""}`}>
      <div className="block-header">
        <div className="block-title">
          <span className="block-icon">{icon}</span>
          <span className="block-label">{label}</span>
        </div>
        <CopyButton text={content} />
      </div>
      <div className="block-divider" />
      {isCode ? (
        <pre className="block-code"><code>{content}</code></pre>
      ) : (
        <p className="block-content">{content}</p>
      )}
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

  const getSection = (text, label, nextLabel) => {
    const regex = nextLabel
      ? new RegExp(`${label}:(.+?)${nextLabel}:`, "s")
      : new RegExp(`${label}:(.+)$`, "s");
    return text.match(regex)?.[1]?.trim() ?? "";
  };

  const generateProject = async () => {
    if (!department || !technology || !level) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ department, technology, level }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.error || "Server Error");
        setLoading(false);
        return;
      }

      const text = data.result;

      setResult({
        title:          getSection(text, "Title", "Explanation"),
        explanation:    getSection(text, "Explanation", "Features"),
        features:       getSection(text, "Features", "Implementation"),
        implementation: getSection(text, "Implementation", "Code"),
        code:           getSection(text, "Code", null),
      });
    } catch {
      alert("Server Error");
    }

    setLoading(false);
  };

  const isReady = department && technology && level;

  return (
    <div className="app">

      {/* HERO */}
      <header className="hero">
        <div className="hero-badge">AI-Powered</div>
        <h1 className="hero-title">
          Project <span className="hero-highlight">Generator</span>
        </h1>
        <p className="hero-sub">
          Generate final year project ideas with code — instantly.
        </p>
      </header>

      {/* FORM CARD */}
      <div className="form-card">
        <div className="selects-row">

          <div className="select-wrap">
            <label className="select-label">Department</label>
            <div className="select-outer">
              <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                <option value="">Choose dept.</option>
                <option>CSE</option>
                <option>ECE</option>
                <option>IT</option>
                <option>EEE</option>
                <option>MECH</option>
                <option>CIVIL</option>
              </select>
              <span className="select-arrow">▾</span>
            </div>
          </div>

          <div className="select-wrap">
            <label className="select-label">Technology</label>
            <div className="select-outer">
              <select value={technology} onChange={(e) => setTechnology(e.target.value)}>
                <option value="">Choose tech.</option>
                <option>AI</option>
                <option>IoT</option>
                <option>Cloud</option>
                <option>Cyber Security</option>
                <option>Blockchain</option>
                <option>Machine Learning</option>
                <option>Data Science</option>
              </select>
              <span className="select-arrow">▾</span>
            </div>
          </div>

          <div className="select-wrap">
            <label className="select-label">Difficulty</label>
            <div className="select-outer">
              <select value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="">Choose level</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
              <span className="select-arrow">▾</span>
            </div>
          </div>

        </div>

        <button
          className={`generate-btn ${loading ? "loading" : ""} ${isReady ? "ready" : ""}`}
          onClick={generateProject}
          disabled={loading}
        >
          {loading ? (
            <span className="btn-inner">
              <span className="spinner" />
              Generating your project…
            </span>
          ) : (
            <span className="btn-inner">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              Generate Project
            </span>
          )}
        </button>
      </div>

      {/* RESULTS */}
      {result && (
        <div className="results">
          <div className="results-header">
            <span className="results-tag">Generated Result</span>
            <div className="results-divider" />
          </div>

          <ResultBlock icon="📌" label="Title"          content={result.title} />
          <ResultBlock icon="💡" label="Explanation"    content={result.explanation} />
          <ResultBlock icon="⚙️" label="Features"       content={result.features} />
          <ResultBlock icon="🛠️" label="Implementation" content={result.implementation} />
          <ResultBlock icon="💻" label="Code"           content={result.code} isCode />
        </div>
      )}

    </div>
  );
}