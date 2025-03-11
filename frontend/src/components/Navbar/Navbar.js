import React, { useState } from 'react';
import './navbar.css';
import logo from '../../images/sathmagalogo.png';

function Navbar({homeRef, aboutRef, contactRef }) {
  const [isOpen, setIsOpen] = useState(false);

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
         
          <li><button onClick={() => homeRef.current.scrollIntoView({ behavior: "smooth" })} className="nav-button">Home</button></li> 
          <li><button onClick={() => aboutRef.current.scrollIntoView({ behavior: "smooth" })} className="nav-button">About</button></li>
          <li><button onClick={() => contactRef.current.scrollIntoView({ behavior: "smooth" })} className="nav-button">Contact</button></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
