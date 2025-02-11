import React, { useState } from 'react';
import './navbar.css';
import logo from '../../images/sathmagalogo.png'; // Adjust the path as needed

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Example onClick function for the button
 

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h2>Sathmaga Educational Institute</h2>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/features">Features</a></li>
          <li><a href="/contact">Contact</a></li>
          
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;
