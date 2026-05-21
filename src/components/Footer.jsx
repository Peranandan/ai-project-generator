import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <span>© 2026 AI Project Generator. All rights reserved.</span>
      </div>
      <div className="footer-links">
        <Link to="/about">About</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/disclaimer">Disclaimer</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </footer>
  );
}