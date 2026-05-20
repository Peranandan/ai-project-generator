import { useState, useRef } from "react";

const API_URL = "https://ai-project-backend-pcuo.onrender.com/chat";

const SECTIONS = [
  { key: "title",          label: "Project Title",              icon: "🏷️" },
  { key: "explanation",    label: "Explanation",                icon: "📖" },
  { key: "features",      label: "Features",                   icon: "✨" },
  { key: "architecture",  label: "Architecture Overview",      icon: "🏗️" },
  { key: "components",    label: "Components",                 icon: "🧩" },
  { key: "steps",         label: "Step-by-Step Implementation",icon: "🪜" },
  { key: "code",          label: "Working Code",               icon: "💻" },
  { key: "code_explanation", label: "Code Explanation",        icon: "🔍" },
];

function parseResponse(text) {
  const sections = {
    title: "", explanation: "", features: [],
    architecture: "", components: "", steps: [],
    code: "", code_explanation: "", description: "",
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
    } else if (/^(Explanation|Description):/i.test(l)) {
      flush(); currentSection = l.toLowerCase().startsWith("desc") ? "description" : "explanation";
      const inline = l.split(":").slice(1).join(":").trim(); if (inline) buffer.push(inline);
    } else if (/^Features:/i.test(l) || /^features$/i.test(l)) {
      flush(); currentSection = "features";
    } else if (/^Architecture/i.test(l)) {
      flush(); currentSection = "architecture";
      const inline = l.split(":").slice(1).join(":").trim(); if (inline) buffer.push(inline);
    } else if (/^(Code Explanation|Code Walkthrough|Code Description):/i.test(l)) {
      flush(); currentSection = "code_explanation";
      const inline = l.split(":").slice(1).join(":").trim(); if (inline) buffer.push(inline);
    } else if (/^(Code:|```|Implementation)/i.test(l)) {
      flush(); currentSection = "code";
      if (!/^```/.test(l)) { const inline = l.split(":").slice(1).join(":").trim(); if (inline) buffer.push(inline); }
    } else if (/^(Steps:|Step-by-Step|Implementation Steps)/i.test(l) || /^steps$/i.test(l)) {
      flush(); currentSection = "steps";
    } else if (/^Components:/i.test(l)) {
      flush(); sections.components = l.replace(/^Components:/i, "").trim(); currentSection = "";
    } else {
      if (l) buffer.push(l);
    }
  }
  flush();

  if (!sections.explanation && sections.description) sections.explanation = sections.description;
  return sections;
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(Array.isArray(text) ? text.join("\n") : text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handle} style={{
      display: "flex", alignItems: "center", gap: 5, padding: "4px 10px",
      fontSize: 12, borderRadius: 6, border: "1px solid #d1d5db",
      background: copied ? "#f0fdf4" : "#fff", color: copied ? "#16a34a" : "#6b7280",
      cursor: "pointer", transition: "all .15s", fontFamily: "inherit",
    }}>
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}

function SectionBlock({ icon, label, children, text }) {
  return (
    <div style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: 20, marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>{icon}</span>
          <span style={{ fontWeight: 600, fontSize: 14, color: "#111" }}>{label}</span>
        </div>
        <CopyButton text={text} />
      </div>
      {children}
    </div>
  );
}

function CodeBlock({ code }) {
  return (
    <pre style={{
      background: "#0f1117", color: "#e2e8f0", borderRadius: 8, padding: "16px 18px",
      fontSize: 13, overflowX: "auto", margin: 0,
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
      lineHeight: 1.6, whiteSpace: "pre-wrap", wordBreak: "break-word",
    }}>
      <code>{code}</code>
    </pre>
  );
}

function StepList({ steps }) {
  return (
    <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
      {steps.map((step, i) => (
        <li key={i} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
          <span style={{
            minWidth: 24, height: 24, borderRadius: "50%",
            background: "#6366f1", color: "#fff", display: "flex",
            alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, marginTop: 1,
          }}>{i + 1}</span>
          <span style={{ fontSize: 14, color: "#374151", lineHeight: 1.6 }}>
            {step.replace(/^[-*•\d.]+\s*/, "")}
          </span>
        </li>
      ))}
    </ol>
  );
}

function FeatureList({ features }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
      {features.map((f, i) => (
        <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ color: "#6366f1", marginTop: 2, fontSize: 14 }}>▸</span>
          <span style={{ fontSize: 14, color: "#374151", lineHeight: 1.6 }}>
            {f.replace(/^[-*•]\s*/, "")}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ResultPanel({ result }) {
  if (!result) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>

      {result.title && (
        <div style={{
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          borderRadius: 12, padding: "20px 24px", marginBottom: 24,
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        }}>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>
              Project Title
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>
              {result.title}
            </div>
          </div>
          <CopyButton text={result.title} />
        </div>
      )}

      {(result.explanation || result.description) && (
        <SectionBlock icon="📖" label="Explanation" text={result.explanation || result.description}>
          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>
            {result.explanation || result.description}
          </p>
        </SectionBlock>
      )}

      {result.features?.length > 0 && (
        <SectionBlock icon="✨" label="Features" text={result.features}>
          <FeatureList features={result.features} />
        </SectionBlock>
      )}

      {result.architecture && (
        <SectionBlock icon="🏗️" label="Architecture Overview" text={result.architecture}>
          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>{result.architecture}</p>
        </SectionBlock>
      )}

      {result.components && (
        <SectionBlock icon="🧩" label="Components" text={result.components}>
          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>{result.components}</p>
        </SectionBlock>
      )}

      {result.steps?.length > 0 && (
        <SectionBlock icon="🪜" label="Step-by-Step Implementation" text={result.steps}>
          <StepList steps={result.steps} />
        </SectionBlock>
      )}

      {result.code && (
        <SectionBlock icon="💻" label="Working Code" text={result.code}>
          <CodeBlock code={result.code} />
        </SectionBlock>
      )}

      {result.code_explanation && (
        <SectionBlock icon="🔍" label="Code Explanation" text={result.code_explanation}>
          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>{result.code_explanation}</p>
        </SectionBlock>
      )}

    </div>
  );
}

export default function App() {
  const [department, setDepartment] = useState("");
  const [technology, setTechnology] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  const generateProject = async () => {
    if (!department || !technology || !level) {
      alert("Please fill all fields");
      return;
    }

    const message = `Generate a complete engineering project for:
Department: ${department}
Technology: ${technology}
Difficulty Level: ${level}

Please provide the following sections clearly labeled:
Project Title:
Explanation:
Features:
Architecture Overview:
Components:
Step-by-Step Implementation:
Code:
Code Explanation:`;

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
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
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

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fb", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* Top Nav */}
      <div style={{
        background: "#fff", borderBottom: "1px solid #e5e7eb",
        padding: "0 24px", display: "flex", alignItems: "center", height: 56,
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15,
          }}>⚡</div>
          <span style={{ fontWeight: 700, fontSize: 16, color: "#111" }}>AI Project Generator</span>
        </div>
      </div>

      {/* Main Layout */}
      <div style={{
        display: "flex", gap: 0, maxWidth: 1200, margin: "0 auto",
        padding: 24, minHeight: "calc(100vh - 56px)", flexWrap: "wrap",
      }}>

        {/* LEFT: Form Sidebar */}
        <div style={{
          width: 300, minWidth: 280, flexShrink: 0,
          background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb",
          padding: 24, height: "fit-content",
          position: "sticky", top: 80, alignSelf: "flex-start",
        }}>
          <h2 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 700, color: "#111" }}>
            Generate Project
          </h2>

          {[
            { label: "Department", value: department, setter: setDepartment, placeholder: "e.g. CSE, ECE, MECH" },
            { label: "Technology", value: technology, setter: setTechnology, placeholder: "e.g. AI, IoT, Blockchain" },
          ].map(({ label, value, setter, placeholder }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label style={{
                display: "block", fontSize: 12, fontWeight: 600, color: "#6b7280",
                marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5,
              }}>{label}</label>
              <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={e => setter(e.target.value)}
                onKeyDown={e => e.key === "Enter" && generateProject()}
                style={{
                  width: "100%", padding: "9px 12px", borderRadius: 8,
                  border: "1px solid #d1d5db", fontSize: 14, outline: "none",
                  fontFamily: "inherit", boxSizing: "border-box", transition: "border-color .15s",
                }}
                onFocus={e => e.target.style.borderColor = "#6366f1"}
                onBlur={e => e.target.style.borderColor = "#d1d5db"}
              />
            </div>
          ))}

          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: "block", fontSize: 12, fontWeight: 600, color: "#6b7280",
              marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5,
            }}>Difficulty</label>
            <select
              value={level}
              onChange={e => setLevel(e.target.value)}
              style={{
                width: "100%", padding: "9px 12px", borderRadius: 8,
                border: "1px solid #d1d5db", fontSize: 14, outline: "none",
                fontFamily: "inherit", background: "#fff", cursor: "pointer",
              }}
            >
              <option value="">Select difficulty</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <button
            onClick={generateProject}
            disabled={loading}
            style={{
              width: "100%", padding: "11px 0", borderRadius: 8,
              background: loading ? "#a5b4fc" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff", border: "none", fontSize: 14, fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}
          >
            {loading ? (
              <>
                <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span>
                Generating...
              </>
            ) : "⚡ Generate Project"}
          </button>

          {/* Jump-to nav */}
          {result && (
            <div style={{ marginTop: 20, borderTop: "1px solid #f0f0f0", paddingTop: 16 }}>
              <div style={{
                fontSize: 12, fontWeight: 600, color: "#6b7280",
                marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5,
              }}>Jump to section</div>
              {SECTIONS.filter(s => {
                const v = result[s.key];
                return v && (Array.isArray(v) ? v.length > 0 : v.trim?.());
              }).map(s => (
                <a key={s.key} href={`#section-${s.key}`} style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "6px 8px",
                  borderRadius: 6, fontSize: 13, color: "#374151", textDecoration: "none",
                  transition: "background .1s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#f3f4f6"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <span>{s.icon}</span>{s.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Results Panel */}
        <div ref={resultRef} style={{ flex: 1, minWidth: 0, paddingLeft: 24 }}>
          {!result && !loading && (
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", minHeight: 400, color: "#9ca3af",
              textAlign: "center", gap: 12,
            }}>
              <div style={{ fontSize: 48 }}>🚀</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#374151" }}>Ready to generate</div>
              <div style={{ fontSize: 14 }}>Fill in the form and click Generate Project</div>
            </div>
          )}

          {loading && (
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", minHeight: 400, gap: 16,
            }}>
              <div style={{
                width: 44, height: 44, border: "3px solid #e5e7eb",
                borderTop: "3px solid #6366f1", borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }} />
              <div style={{ fontSize: 15, color: "#6b7280" }}>Generating your project...</div>
            </div>
          )}

          {result && (
            <div style={{
              background: "#fff", borderRadius: 14,
              border: "1px solid #e5e7eb", padding: 28,
            }}>
              <ResultPanel result={result} />
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        @media (max-width: 700px) {
          div[style*="flex-wrap: wrap"] { flex-direction: column; }
          div[style*="position: sticky"] { position: relative !important; top: auto !important; width: 100% !important; }
          div[style*="paddingLeft: 24px"] { padding-left: 0 !important; margin-top: 16px; }
        }
      `}</style>
    </div>
  );
}