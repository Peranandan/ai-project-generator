import { useState } from "react";
import "./Home.css";

export default function Home() {
  const [department, setDepartment] = useState("");
  const [technology, setTechnology] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState("");

  const API_URL = "https://ai-project-backend-pcuo.onrender.com/chat";

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        alert(`Server error: ${res.status}`);
        return;
      }

      const data = await res.json();

      if (data.success) {
        setResult(parseResponse(data.response));
      } else {
        alert(data.detail || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Backend connection failed.");
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

      if (currentSection === "features" || currentSection === "steps") {
        sections[currentSection] = buffer.filter(Boolean);
      } else {
        sections[currentSection] = buffer.join("\n").trim();
      }

      buffer = [];
    };

    for (const line of lines) {
      const l = line.trim();

      // Code block handling
      if (l.startsWith("```")) {
        if (!inCodeBlock) {
          flush();
          currentSection = "code";
          inCodeBlock = true;
        } else {
          inCodeBlock = false;
          flush();
          currentSection = "";
        }
        continue;
      }

      if (inCodeBlock) {
        buffer.push(line);
        continue;
      }

      if (/^Project Title:/i.test(l)) {
        flush();
        sections.title = l.replace(/^Project Title:/i, "").trim();
        currentSection = "";
      }

      else if (/^Explanation:/i.test(l)) {
        flush();
        currentSection = "explanation";

        const value = l.split(":").slice(1).join(":").trim();
        if (value) buffer.push(value);
      }

      else if (/^Description:/i.test(l)) {
        flush();
        currentSection = "description";

        const value = l.split(":").slice(1).join(":").trim();
        if (value) buffer.push(value);
      }

      else if (/^Features:/i.test(l)) {
        flush();
        currentSection = "features";
      }

      else if (/^Architecture/i.test(l)) {
        flush();
        currentSection = "architecture";

        const value = l.split(":").slice(1).join(":").trim();
        if (value) buffer.push(value);
      }

      else if (/^(Code Explanation|Code Walkthrough):/i.test(l)) {
        flush();
        currentSection = "code_explanation";

        const value = l.split(":").slice(1).join(":").trim();
        if (value) buffer.push(value);
      }

      else if (/^(Steps:|Step-by-Step|Implementation Steps)/i.test(l)) {
        flush();
        currentSection = "steps";
      }

      else if (/^Components:/i.test(l)) {
        flush();
        sections.components = l.replace(/^Components:/i, "").trim();
        currentSection = "";
      }

      else {
        if (l) {
          buffer.push(l);
        }
      }
    }

    flush();

    if (!sections.explanation && sections.description) {
      sections.explanation = sections.description;
    }

    return sections;
  };

  const copyToClipboard = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);

      setTimeout(() => {
        setCopied("");
      }, 2000);
    } catch (err) {
      alert("Copy failed.");
    }
  };

  const CopyBtn = ({ text, id }) => (
    <button
      type="button"
      className={`copy-btn ${copied === id ? "copy-btn-done" : ""}`}
      onClick={() => copyToClipboard(text, id)}
    >
      {copied === id ? "✓ Copied" : "Copy"}
    </button>
  );

  const Section = ({ id, title, content, isCode = false }) => {
    if (!content) return null;

    if (Array.isArray(content) && content.length === 0) {
      return null;
    }

    const text = Array.isArray(content)
      ? content.join("\n")
      : content;

    return (
      <div className="section">
        <div className="section-header">
          <span className="section-title">{title}</span>
          <CopyBtn text={text} id={id} />
        </div>

        <div className={`section-content ${isCode ? "code-block" : ""}`}>
          {Array.isArray(content) ? (
            content.map((item, index) => (
              <div key={index} className="list-item">
                {item.replace(/^[-*•\d.]+\s*/, "")}
              </div>
            ))
          ) : isCode ? (
            <pre>{content}</pre>
          ) : (
            <p>{content}</p>
          )}
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
              <option value="" disabled>
                Select Difficulty
              </option>

              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
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

                <CopyBtn text={result.title} id="title" />
              </div>
            )}

            <Section
              id="explanation"
              title="📖 Explanation"
              content={result.explanation || result.description}
            />

            <Section
              id="features"
              title="✨ Features"
              content={result.features}
            />

            <Section
              id="architecture"
              title="🏗️ Architecture Overview"
              content={result.architecture}
            />

            <Section
              id="components"
              title="🧩 Components"
              content={result.components}
            />

            <Section
              id="steps"
              title="🪜 Step-by-Step Implementation"
              content={result.steps}
            />

            <Section
              id="code"
              title="💻 Code"
              content={result.code}
              isCode={true}
            />

            <Section
              id="code_explanation"
              title="🔍 Code Explanation"
              content={result.code_explanation}
            />
          </div>
        )}
      </div>
    </div>
  );
}
