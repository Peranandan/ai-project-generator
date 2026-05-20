import { useState } from "react";
import "./markdown.css";

export default function App() {
  const [department, setDepartment] = useState("");
  const [technology, setTechnology] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const API_URL = "http://localhost:8000/chat";

  const generateProject = async () => {
    if (!department || !technology || !level) {
      alert("Please fill all fields");
      return;
    }

    const message = `Dept:${department} Tech:${technology} Level:${level} project`;

    try {
      setLoading(true);
      setResult(null);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (data.success) {
        setResult(parseResponse(data.response));
      } else {
        alert(data.detail || "Something went wrong");
      }

    } catch (err) {
      console.error(err);
      alert("Backend connection failed");
    } finally {
      setLoading(false);
    }
  };

  const parseResponse = (text) => {
    const sections = {
      title: "",
      explanation: "",
      features: [],
      architecture: "",
      code: "",
      steps: [],
      components: "",
      description: "",
      code_explanation: "",
    };

    const lines = text.split("\n");
    let currentSection = "";
    let buffer = [];
    let inCodeBlock = false;

    const flush = () => {
      if (!currentSection) return;
      const content = buffer.join("\n").trim();
      if (currentSection === "steps" || currentSection === "features") {
        sections[currentSection] = buffer.filter(Boolean);
      } else {
        sections[currentSection] = content;
      }
      buffer = [];
    };

    for (const line of lines) {
      const l = line.trim();

      if (l.startsWith("```")) {
        inCodeBlock = !inCodeBlock;
        if (!inCodeBlock) continue;
        currentSection = "code";
        continue;
      }

      if (inCodeBlock) { buffer.push(line); continue; }

      if (/^Project Title:/i.test(l)) {
        flush(); sections.title = l.replace(/^Project Title:/i, "").trim(); currentSection = "";
      } else if (/^(Explanation):/i.test(l)) {
        flush(); currentSection = "explanation";
        const inline = l.split(":").slice(1).join(":").trim(); if (inline) buffer.push(inline);
      } else if (/^Description:/i.test(l)) {
        flush(); currentSection = "description";
        const inline = l.split(":").slice(1).join(":").trim(); if (inline) buffer.push(inline);
      } else if (/^Features:/i.test(l) || /^features$/i.test(l)) {
        flush(); currentSection = "features";
      } else if (/^Architecture/i.test(l)) {
        flush(); currentSection = "architecture";
        const inline = l.split(":").slice(1).join(":").trim(); if (inline) buffer.push(inline);
      } else if (/^(Code Explanation|Code Walkthrough):/i.test(l)) {
        flush(); currentSection = "code_explanation";
        const inline = l.split(":").slice(1).join(":").trim(); if (inline) buffer.push(inline);
      } else if (/^Code:/i.test(l)) {
        flush(); currentSection = "code";
      } else if (/^(Steps:|Step-by-Step|Implementation Steps)/i.test(l) || /^steps$/i.test(l)) {
        flush(); currentSection = "steps";
      } else if (/^Components:/i.test(l)) {
        flush(); sections.components = l.replace(/^Components:/i, "").trim(); currentSection = "";
      } else {
        if (l) buffer.push(l);
      }
    }
    flush();

    if (!sections.explanation && sections.description) {
      sections.explanation = sections.description;
    }

    return sections;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const Section = ({ title, content, isCode }) => {
    if (!content || (Array.isArray(content) && content.length === 0)) return null;
    const text = Array.isArray(content) ? content.join("\n") : content;

    return (
      <div className="section">
        <div className="section-header">
          <span className="section-title">{title}</span>
          <button className="copy-btn" onClick={() => copyToClipboard(text)}>
            Copy
          </button>
        </div>
        <div className={`section-content ${isCode ? "code-block" : ""}`}>
          {Array.isArray(content)
            ? content.map((item, i) => (
                <div key={i} className="list-item">
                  {item.replace(/^[-*•\d.]+\s*/, "")}
                </div>
              ))
            : isCode
            ? <pre>{content}</pre>
            : <p>{content}</p>
          }
        </div>
      </div>
    );
  };

  return (
    <div className="page">
      <div className="container">

        <div className="header">
          <div className="header-icon">⚡</div>
          <h1>AI Project Generator</h1>
          <p>Generate complete engineering projects using AI</p>
        </div>

        <div className="form">

          <div className="field">
            <label>Department</label>
            <input
              type="text"
              placeholder="e.g. CSE, ECE, MECH"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generateProject()}
            />
          </div>

          <div className="field">
            <label>Technology</label>
            <input
              type="text"
              placeholder="e.g. AI, IoT, Blockchain"
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generateProject()}
            />
          </div>

          <div className="field">
            <label>Difficulty</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">Select Difficulty</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <button
            className="generate-btn"
            onClick={generateProject}
            disabled={loading}
          >
            {loading ? (
              <span className="btn-loading">
                <span className="btn-spinner" />
                Generating...
              </span>
            ) : (
              "⚡ Generate Project"
            )}
          </button>

        </div>

        {loading && (
          <div className="loading-box">
            <div className="spinner" />
            <p>Generating your project...</p>
          </div>
        )}

        {result && (
          <div className="result-box">

            {result.title && (
              <div className="project-title">
                <div className="project-title-left">
                  <span className="project-label">Project Title</span>
                  <span className="project-name">{result.title}</span>
                </div>
                <button className="copy-btn" onClick={() => copyToClipboard(result.title)}>
                  Copy
                </button>
              </div>
            )}

            <Section title="📖 Explanation" content={result.explanation || result.description} />
            <Section title="✨ Features" content={result.features} />
            <Section title="🏗️ Architecture Overview" content={result.architecture} />
            <Section title="🧩 Components" content={result.components} />
            <Section title="🪜 Step-by-Step Implementation" content={result.steps} />
            <Section title="💻 Code" content={result.code} isCode={true} />
            <Section title="🔍 Code Explanation" content={result.code_explanation} />

          </div>
        )}

      </div>
    </div>
  );
}