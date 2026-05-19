import { useState } from "react";
import "./App.css";

export default function App() {
  const [domain, setDomain] = useState("");
  const [technology, setTechnology] = useState("");
  const [level, setLevel] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://ai-project-generator-backend.onrender.com/generate";

  // ⚡ SINGLE REQUEST ONLY (cost optimized)
  const generate = async () => {
    if (!domain || !technology || !level) return alert("Fill all fields");

    setLoading(true);
    setData(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain, technology, level }),
      });

      const json = await res.json();

      // ⚡ NO EXTRA API CALLS (IMPORTANT FOR COST)
      const parts = json.result.split("\n");

      setData({
        title: parts[0] || "",
        idea: parts[1] || "",
        features: parts[2] || "",
        steps: parts[3] || "",
        code: parts.slice(4).join("\n"),
      });

    } catch (err) {
      alert("Error generating project");
    }

    setLoading(false);
  };

  const copy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="app">

      {/* HEADER */}
      <div className="header">
        <h1>⚡ AI Project Generator</h1>
        <p>Build Final Year Projects in Seconds 🚀</p>
      </div>

      {/* INPUT BOX */}
      <div className="card">
        <input
          placeholder="Department (CSE / ECE / IT)"
          onChange={(e) => setDomain(e.target.value)}
        />

        <input
          placeholder="Technology (AI / IoT / Cloud)"
          onChange={(e) => setTechnology(e.target.value)}
        />

        <select onChange={(e) => setLevel(e.target.value)}>
          <option>Select Level</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <button onClick={generate} disabled={loading}>
          {loading ? "Generating..." : "🚀 Generate (1 API Call)"}
        </button>
      </div>

      {/* OUTPUT */}
      {data && (
        <div className="output">

          <div className="box">
            <h2>Title</h2>
            <p>{data.title}</p>
            <button onClick={() => copy(data.title)}>Copy</button>
          </div>

          <div className="box">
            <h2>Idea</h2>
            <p>{data.idea}</p>
            <button onClick={() => copy(data.idea)}>Copy</button>
          </div>

          <div className="box">
            <h2>Features</h2>
            <p>{data.features}</p>
            <button onClick={() => copy(data.features)}>Copy</button>
          </div>

          <div className="box">
            <h2>Steps</h2>
            <p>{data.steps}</p>
            <button onClick={() => copy(data.steps)}>Copy</button>
          </div>

          <div className="box code">
            <h2>Code</h2>
            <pre>{data.code}</pre>
            <button onClick={() => copy(data.code)}>Copy Code</button>
          </div>

        </div>
      )}

    </div>
  );
}