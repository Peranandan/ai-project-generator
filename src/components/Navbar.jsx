import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {

  const [menuOpen, setMenuOpen] =
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

        {/* DESKTOP LINKS */}

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/about">
            About
          </Link>

          {/* PROJECTS */}

          <div className="dropdown">

            <button className="nav-btn">
              Projects
            </button>

            <div className="dropdown-content">

              <a href="#">
                🤖 AI Chatbot Assistant
              </a>

              <a href="#">
                🚦 Smart Traffic Control
              </a>

              <a href="#">
                🌱 IoT Smart Farming
              </a>

              <a href="#">
                🎓 Face Recognition Attendance
              </a>

              <a href="#">
                ☁ Cloud File Storage System
              </a>

              <a href="#">
                🔐 Cybersecurity Threat Detection
              </a>

              <a href="#">
                🏥 AI Healthcare Monitoring
              </a>

              <a href="#">
                📡 Smart Home Automation
              </a>

            </div>

          </div>

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

        {/* MOBILE BUTTON */}

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