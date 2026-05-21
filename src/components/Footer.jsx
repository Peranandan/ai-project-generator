import { Link } from "react-router-dom";

export default function Footer() {

  return (

    <footer className="footer">

      <div className="footer-container">

        {/* TOP */}

        <div className="footer-top">

          {/* BRAND */}

          <div className="footer-brand">

            <h2>
              ⚡ AI Project Generator
            </h2>

            <p>
              Modern AI-powered platform for generating
              engineering project ideas, workflows,
              architecture, and implementation guidance.
            </p>

          </div>

          {/* LINKS */}

          <div className="footer-links-grid">

            <div className="footer-links">

              <h3>
                Platform
              </h3>

              <Link to="/">
                Home
              </Link>

              <Link to="/about">
                About
              </Link>

              <Link to="/contact">
                Contact
              </Link>

            </div>

            <div className="footer-links">

              <h3>
                Legal
              </h3>

              <Link to="/privacy">
                Privacy
              </Link>

              <Link to="/terms">
                Terms
              </Link>

              <Link to="/disclaimer">
                Disclaimer
              </Link>

            </div>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="footer-bottom">

          <p>
            © 2026 AI Project Generator.
            All rights reserved.
          </p>

        </div>

      </div>

    </footer>

  );
}