export default function About() {
  return (
    <div className="page">
      <div className="container">
        <div className="static-page">
          <h2>About</h2>
          <p>AI Project Generator helps engineering students instantly generate complete project ideas using Google Gemini AI. Enter your department, technology, and difficulty level to get a full project with explanation, architecture, code, and step-by-step implementation.</p>
          <h3>What We Offer</h3>
          <ul>
            <li>Complete project ideas for all engineering branches</li>
            <li>Working sample code for every project</li>
            <li>Architecture overview and component list</li>
            <li>Step-by-step implementation guide</li>
            <li>Copy any section with one click</li>
          </ul>
          <h3>Technology Stack</h3>
          <ul>
            <li>Frontend: React + Vite, hosted on Vercel</li>
            <li>Backend: FastAPI + Python, hosted on Render</li>
            <li>AI: Google Gemini 2.5 Flash-Lite</li>
          </ul>
          <h3>Supported Branches</h3>
          <p>CSE, ECE, EEE, MECH, CIVIL, IT, and all other engineering departments. Supports AI, IoT, Blockchain, Robotics, Cloud, Embedded Systems, and more.</p>
        </div>
      </div>
    </div>
  );
}