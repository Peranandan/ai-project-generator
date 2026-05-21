export default function About() {

  return (

    <div className="page">

      <div className="container">

        <div className="static-page">

          <div className="hero-grid">

            {/* LEFT */}

            <div className="hero-left">

              <span className="page-badge">
                About Platform
              </span>

              <h1>
                Smart AI Solutions
                For Engineering Students
              </h1>

              <p className="page-intro">
                AI Project Generator helps students,
                developers, and researchers generate
                innovative project ideas instantly
                using artificial intelligence.
              </p>

            </div>

            {/* RIGHT */}

            <div className="hero-right">

              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                alt="About AI"
              />

            </div>

          </div>

          <div className="features">

            <div className="feature-box">

              <h3>⚡ AI Powered</h3>

              <p>
                Generate engineering projects instantly
                with advanced AI models.
              </p>

            </div>

            <div className="feature-box">

              <h3>📚 Academic Support</h3>

              <p>
                Built for mini projects,
                major projects, and research work.
              </p>

            </div>

            <div className="feature-box">

              <h3>🚀 Faster Workflow</h3>

              <p>
                Save research time and improve
                productivity with AI assistance.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}