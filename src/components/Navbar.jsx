import { Link } from "react-router-dom";

export default function Navbar() {

  return (

    <nav className="navbar">

      <div className="navbar-container">

        <Link
          to="/"
          className="logo"
        >
          ⚡ AI Startup
        </Link>

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/blogs">
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

          <Link
            to="/contact"
            className="nav-btn"
          >
            Contact
          </Link>

        </div>

      </div>

    </nav>
  );
}