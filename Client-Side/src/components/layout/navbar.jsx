import React,{useState} from 'react';
import '../../assets/css/Navbar.css';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="navWrapper">
      <nav className="navContent">

        <div className="logo">
          {isAuthenticated ? (
            <>
              <span>Welcome, {user.name}</span>
            </>
          ) : (
            <>
              <svg class="logoIcon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 14L16 8L28 14L16 20L4 14Z" stroke="#3ebfe6ff" stroke-width="2.5" stroke-linejoin="round" />
                <path d="M9 16.5V22C9 22 12 24 16 24C20 24 23 22 23 22V16.5" stroke="#3ebfe6ff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span>SMART CAMPUS</span>
            </>
          )}



        </div>

        <div className={`links ${isMenuOpen ? 'active' : ''}`}>
          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
          <NavLink to="/student" onClick={() => setIsMenuOpen(false)}>Student</NavLink>
          <NavLink to="/teacher" onClick={() => setIsMenuOpen(false)}>Teacher</NavLink>
          <NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</NavLink>
          <NavLink to="/chat" onClick={() => setIsMenuOpen(false)}>ChatBot</NavLink>
          
          
          <div className="mobile-only-buttons">
             {isAuthenticated ? (
                <button className="cta login" onClick={handleLogout}>Logout</button>
             ) : (
               <>
                 <Link to="/login" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Login</Link>
                 <Link to="/register" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Register</Link>
               </>
             )}
          </div>
        </div>

        <div className="register desktop-only">
          {isAuthenticated ? (
            <button className="cta login" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <button className="cta login"><Link to="/login">Login</Link></button>
              <button className="cta"><Link to="/register">Register</Link></button>
            </>
          )}
        </div>

        
        <div className="hamburger" onClick={toggleMenu}>
          <span className={isMenuOpen ? "bar open" : "bar"}></span>
          <span className={isMenuOpen ? "bar open" : "bar"}></span>
          <span className={isMenuOpen ? "bar open" : "bar"}></span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;