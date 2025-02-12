import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './home.css';
import bg1 from '../../images/bg1.webp'; 
import bg2 from '../../images/bg2.jpg';
import bg4 from '../../images/bg4.png';
import Navbar from '../Navbar/Navbar';

const images = [bg1,bg2,bg4];

function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = () => {
    navigate('/Login')
  };

  return (
    <div>
      <div> <Navbar/></div>
      
      <div
        className="home-container"
        style={{ backgroundImage: `url(${images[currentImage]})` }} // Corrected template string
      >
        <h1> Sathmaga Attendance Management System</h1>
       
        <button className='btn-container' onClick={handleButtonClick}>
              Login
        </button>
      </div>
      
      
    
   </div>
  );
}

export default Home;
