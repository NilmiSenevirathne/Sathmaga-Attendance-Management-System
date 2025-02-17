import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import './navbar.css';
import logo from '../../images/sathmagalogo.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Refs for smooth scrolling
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h2>සත්මග  අධ්‍යාපන ආයතනය</h2>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><button onClick={() => scrollToSection(aboutRef)} className="nav-button">About</button></li>
          <li><Link to="/features">Features</Link></li>
          <li><button onClick={() => scrollToSection(contactRef)} className="nav-button">Contact</button></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
