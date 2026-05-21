import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/privacy", label: "Privacy" },
    { path: "/terms", label: "Terms" },
    { path: "/disclaimer", label: "Disclaimer" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">⚡ AI Project Generator</Link>
      </div>
      <div className="navbar-links">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`navbar-link ${location.pathname === link.path ? "active" : ""}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}