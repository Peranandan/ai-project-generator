import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "./markdown.css";

function App() {
  const [domain, setDomain] = useState("");
  const [tech, setTech] = useState("");
  const [level, setLevel] = useState("Medium");

  const [output, setOutput] = useState("");
  const [view, setView] = useState("");
  const [loading, setLoading] = useState(false);

  // 🚀 COST OPTIMIZED GENERATE
  const generate = async () => {
    if (loading) return;
    if (!domain || !tech) return alert("Fill all fields");

    setLoading(true);
    setView("");

    try {
      const res = await fetch("http://127.0.0.1:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain,
          technology: tech,
          level,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setOutput(data.result);
        setView(data.result);
      } else {
        setView(data.message);
      }
    } catch (err) {
      setView("Server Error");
    }

    setLoading(false);
  };

  // 📋 COPY FULL PROJECT (BOTTOM ONLY)
  const copyAll = () => {
    navigator.clipboard.writeText(output);
    alert("Full Project Copied");
  };

  // 📋 COPY CODE ONLY
  const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const codeText = String(children).replace(/\n$/, "");

    const copyCode = () => {
      navigator.clipboard.writeText(codeText);
      alert("Code Copied");
    };

    return !inline ? (
      <div className="code-wrapper">
        <button className="code-copy-btn" onClick={copyCode}>
          Copy Code
        </button>
        <pre className={className}>
          <code {...props}>{children}</code>
        </pre>
      </div>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  };

  return (
    <div className="container">
      <div className="card">

        {/* TITLE */}
        <h1 className="title">AI Project Generator</h1>

        {/* INPUTS */}
        <label className="label">Department</label>
        <input
          className="input"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="CSE / ECE / IT / MECH"
        />

        <label className="label">Technology</label>
        <input
          className="input"
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          placeholder="AI / IoT / Cloud / Blockchain"
        />

        <label className="label">Level</label>
        <select
          className="input"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        {/* GENERATE */}
        <button className="btn" onClick={generate} disabled={loading}>
          {loading ? "Generating..." : "Generate Project"}
        </button>

        {/* OUTPUT */}
        {view && (
          <div className="output">

            <div className="block">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  code: CodeBlock,
                }}
              >
                {view}
              </ReactMarkdown>
            </div>

            {/* FINAL COPY ONLY */}
            <div className="final-copy">
              <button onClick={copyAll}>Copy Full Project</button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;