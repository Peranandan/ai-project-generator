import { useState } from "react";
import "./App.css";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button className={`copy-btn ${copied ? "copied" : ""}`} onClick={handleCopy}>
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}

export default function App() {
  const [department, setDepartment] = useState("");
  const [technology, setTechnology] = useState("");
  const [level, setLevel] = useState("");

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND_URL + "/generate";

  const typeText = (text, callback) => {
    let i = 0;
    const speed = 6;

    const interval = setInterval(() => {
      i++;
      callback(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
  };

  const getSection = (text, start, end) => {
    const regex = end
      ? new RegExp(`${start}:(.*?)${end}:`, "s")
      : new RegExp(`${start}:(.*)`, "s");

    return text.match(regex)?.[1]?.trim() || "";
  };

  const generateProject = async () => {
    if (!department || !technology || !level) return;

    const userText = `Dept: ${department} | Tech: ${technology} | Level: ${level}`;

    setMessages((prev) => [...prev, { role: "user", text: userText }]);

    setLoading(true);

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ department, technology, level }),
    });

    const data = await res.json();
    const text = data.result;

    const finalText = `
Title: ${getSection(text, "Title", "Explanation")}

Explanation: ${getSection(text, "Explanation", "Features")}

Features: ${getSection(text, "Features", "Implementation")}

Implementation: ${getSection(text, "Implementation", "Code")}

Code:
${getSection(text, "Code")}
`;

    setMessages((prev) => [...prev, { role: "ai", text: "" }]);

    setLoading(false);

    typeText(finalText, (val) => {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: "ai", text: val };
        return copy;
      });
    });
  };

  return (
    <div className="app">

      {/* LEFT PANEL */}
      <div className="sidebar">

        <h1 className="logo">AI Project Generator</h1>

        <div className="box">
          <label>Department</label>
          <select onChange={(e) => setDepartment(e.target.value)}>
            <option value="">Select</option>
            <option>CSE</option>
            <option>ECE</option>
            <option>IT</option>
            <option>EEE</option>
          </select>
        </div>

        <div className="box">
          <label>Technology</label>
          <select onChange={(e) => setTechnology(e.target.value)}>
            <option value="">Select</option>
            <option>AI</option>
            <option>IoT</option>
            <option>Cloud</option>
            <option>Cyber Security</option>
          </select>
        </div>

        <div className="box">
          <label>Level</label>
          <select onChange={(e) => setLevel(e.target.value)}>
            <option value="">Select</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        <button className="send-btn" onClick={generateProject} disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>

      </div>

      {/* CHAT AREA */}
      <div className="chat">

        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.role}`}>

            <div className="bubble">

              <pre>{msg.text}</pre>

              {msg.role === "ai" && msg.text && (
                <CopyButton text={msg.text} />
              )}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}