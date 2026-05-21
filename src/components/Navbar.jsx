import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [projectOpen, setProjectOpen] =
    useState(false);

  return (

    <nav className="navbar">

      <div className="navbar-container">

        {/* LOGO */}

        <Link
          to="/"
          className="logo"
        >
          ⚡ AI Project Generator
        </Link>

        {/* NAV LINKS */}

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/about">
            About
          </Link>

          {/* PROJECTS */}

          <div className="dropdown">

            <button
              className="nav-btn project-btn"
              onClick={() =>
                setProjectOpen(!projectOpen)
              }
            >
              Projects ▾
            </button>

            {
              projectOpen && (

                <div className="project-dropdown">

                  {/* PROJECT 1 */}

                  <div className="project-card">

                    <img
                      src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop"
                      alt="AI Chatbot"
                    />

                    <div>

                      <h4>
                        AI Chatbot Assistant
                      </h4>

                      <p>
                        Intelligent chatbot using
                        NLP and Machine Learning
                        for customer support.
                      </p>

                    </div>

                  </div>

                  {/* PROJECT 2 */}

                  <div className="project-card">

                    <img
                      src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
                      alt="Traffic"
                    />

                    <div>

                      <h4>
                        Smart Traffic Monitoring
                      </h4>

                      <p>
                        AI-powered traffic analysis
                        system using cameras
                        and real-time prediction.
                      </p>

                    </div>

                  </div>

                  {/* PROJECT 3 */}

                  <div className="project-card">

                    <img
                      src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
                      alt="IoT"
                    />

                    <div>

                      <h4>
                        IoT Smart Farming
                      </h4>

                      <p>
                        Smart agriculture platform
                        using sensors and cloud
                        monitoring systems.
                      </p>

                    </div>

                  </div>

                  {/* PROJECT 4 */}

                  <div className="project-card">

                    <img
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                      alt="Cybersecurity"
                    />

                    <div>

                      <h4>
                        Cybersecurity Detection
                      </h4>

                      <p>
                        Advanced threat detection
                        platform using Artificial
                        Intelligence algorithms.
                      </p>

                    </div>

                  </div>

                </div>

              )
            }

          </div>

          <Link to="/blogs">
            Blogs
          </Link>

          <Link to="/contact">
            Contact
          </Link>

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

        {/* MOBILE */}

        <button
          className="mobile-menu-btn"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}

      {
        menuOpen && (

          <div className="mobile-menu">

            <Link to="/">
              Home
            </Link>

            <Link to="/about">
              About
            </Link>

            <Link to="/blogs">
              Blogs
            </Link>

            <Link to="/contact">
              Contact
            </Link>

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

        )
      }

    </nav>
  );
}