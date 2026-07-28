import { Link, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          MedGuide
        </Link>

        {/* Navigation */}
        <nav className="nav-menu">
          <Link to="/">Home</Link>

          <div className="nav-dropdown">
            <div className="nav-dropdown-toggle">
              Counsellings
              <ChevronDown size={18} />
            </div>

            <div className="nav-dropdown-menu">
              <Link to="/neet-pg">NEET PG</Link>
              <Link to="/neet-ug">NEET UG</Link>
              <Link to="/inicet">INICET</Link>
              <Link to="/neet-ss">NEET SS</Link>
            </div>
          </div>

          <Link to="/blog">Blog</Link>
          <Link to="/news">News</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Auth */}
        {isAuthenticated ? (
          <button className="nav-logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        ) : (
          <Link to="/login" className="nav-login-btn">
            Log-In | Sign-Up
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
