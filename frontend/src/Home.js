import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="homecontainer">
      <nav className="navbar">
        <h1>Attendance System</h1>
        <ul className="navlinks">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>

      <div className="welcome">
        <h2>Welcome to the Attendance Management System</h2>
   
        <Link to="/login">
          <button className="getstartedbtn">Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
