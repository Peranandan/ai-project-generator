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

        {/* LINKS */}

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
              className="nav-btn"
              onClick={() =>
                setProjectOpen(!projectOpen)
              }
            >
              Projects ▾
            </button>

            {
              projectOpen && (

                <div className="dropdown-content">

                  <Link to="/">
                    🤖 AI Chatbot Assistant
                  </Link>

                  <Link to="/">
                    🚦 Traffic Monitoring
                  </Link>

                  <Link to="/">
                    🌱 IoT Smart Farming
                  </Link>

                  <Link to="/">
                    🎓 Face Attendance
                  </Link>

                  <Link to="/">
                    ☁ Cloud Storage
                  </Link>

                  <Link to="/">
                    🔐 Cybersecurity
                  </Link>

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