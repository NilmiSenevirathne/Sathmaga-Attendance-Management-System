import React, { useState, useEffect,useRef } from 'react';
import { useNavigate } from "react-router-dom";
import './home.css';
import bg1 from '../../Images/bg1.webp'; 
import bg2 from '../../Images/bg2.jpg';
import bg4 from '../../Images/bg4.png';
import Navbar from '../Navbar/Navbar';


const images = [bg1,bg2,bg4];

function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

//refs for smooth scrolling
const aboutRef = useRef(null);
const contactRef = useRef(null)


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = () => {
    navigate('/Login')
  };

  //function for smooth scrolling
  const scrollToSection = (ref) =>{
     ref.current.scrollIntoView({behavior: "smooth"});
  };

  return (
    <div>
         {/* Navbar with scrolling functionality */}
      <Navbar />
      <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white p-4 flex justify-center space-x-6 shadow-md">
        <button onClick={() => scrollToSection(aboutRef)} className="hover:text-blue-400">About</button>
        <button onClick={() => scrollToSection(contactRef)} className="hover:text-blue-400">Contact</button>
      </nav>
      
      <div
        className="home-container"
        style={{ backgroundImage: `url(${images[currentImage]})` }} // Corrected template string
      >
        <h1> Sathmaga Attendance Management System</h1>
       
        <button className='btn-container' onClick={handleButtonClick}>
              Login
        </button>
      </div>
      
      <div>
       {/* About Section */}
       <section ref={aboutRef} className="section about-section">
        <h2>About Sathmaga Attendance Management System</h2>
        <p>
          Sathmaga Attendance Management System is designed to streamline attendance tracking 
          for educational institutions. It offers real-time attendance monitoring, reporting, 
          and seamless user management.
        </p>
      </section>
      </div>

      <div>
          {/* Contact Section */}
      <section ref={contactRef} className="section contact-section">
        <h2>Contact Us</h2>
        <p>Email: support@sathmaga.com</p>
        <p>Phone: +94 71 234 5678</p>
      </section>
      </div>

    
   </div>
  );
}

export default Home;
