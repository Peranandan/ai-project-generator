import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <nav className="navbar">

      <div className="navbar-container">

        {/* LOGO */}

        <Link to="/" className="logo">
          ⚡ AI Project Generator
        </Link>

        {/* DESKTOP MENU */}

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/contact">
            Contact
          </Link>

          <Link to="/">
            Projects
          </Link>

          <Link to="/">
            Features
          </Link>

          <Link to="/">
            Blogs
          </Link>

          {/* 3 DOT MENU */}

          <div className="dropdown">

            <button className="dropdown-btn">
              ⋯
            </button>

            <div className="dropdown-content">

              <Link to="/privacy">
                Privacy Policy
              </Link>

              <Link to="/terms">
                Terms & Conditions
              </Link>

              <Link to="/disclaimer">
                Disclaimer
              </Link>

            </div>

          </div>

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

            <Link to="/">
              Projects
            </Link>

            <Link to="/">
              Features
            </Link>

            <Link to="/">
              Blogs
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