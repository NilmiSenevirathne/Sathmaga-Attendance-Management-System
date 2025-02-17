import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import './home.css';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import bg1 from '../../images/bg1.webp';
import bg2 from '../../images/bg2.jpg';
import bg4 from '../../images/bg4.png';
import vision from '../../images/vision.webp'
import mission from '../../images/mission.jpg'
import contactBg from '../../images/contact.jpg'
import Navbar from '../Navbar/Navbar';

const images = [bg1, bg2, bg4];

function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  //refs for smooth scrolling
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

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
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const [showVision, setShowVision] = useState(false); // State to toggle Vision visibility
  const [showMission, setShowMission] = useState(false); // State to toggle Mission visibility

  const handleVisionClick = () => setShowVision(!showVision); // Toggle Vision visibility
  const handleMissionClick = () => setShowMission(!showMission); // Toggle Mission visibility

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

      {/* About Us Section */}
      <div>
        <section ref={aboutRef} className="section about-section">
          <div className="about-container">
            {/* Text Part */}
            <div className="about-text">
              <h2 className="about-heading">About Sathmaga Institute</h2>
              <p>
                Established in <strong>2019</strong>, <strong>Sathmaga Institute</strong> is a distinguished primary and secondary educational institution dedicated to nurturing young minds from Grade 1 to Advanced Level. Our institute provides a holistic learning environment that fosters academic excellence, critical thinking, and personal growth.
              </p>
              <p>
                Under the guidance of our Director, <strong>Mr. J.M.D.R. Senevirathne</strong>, Sathmaga Institute has grown into a vibrant learning community with a team of <strong>10 highly qualified academic staff</strong> supporting the education of over <strong>400 students</strong>.
              </p>

              <h3 className="academic-structure-heading">Academic Structure & Subjects</h3>
              <div className="academic-structure">
                <ul>
                  <li>
                    <strong>Primary Section (Grades 1-5):</strong>
                    <ul>
                      <li>English</li>
                      <li>Shishyathwa (Scholarship Exam Preparation)</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Junior & Senior Secondary (Grades 6-11):</strong>
                    <ul>
                      <li>Mathematics</li>
                      <li>Science</li>
                      <li>English</li>
                      <li>Sinhala</li>
                      <li>ICT (Information & Communication Technology)</li>
                      <li>Tamil</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Advanced Level (Grades 12-13):</strong>
                    <ul>
                      <li>Sinhala</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <p>
                At <strong>Sathmaga Institute</strong>, we are committed to empowering students with knowledge, skills, and values that prepare them for a successful future. Our dedicated educators and well-structured curriculum ensure that every student reaches their full potential in a supportive and inspiring academic environment.
              </p>
            </div>

            {/* Vision and Mission Cards Section */}
            <div className="about-cards">
              {/* Vision Card */}
              <div className="bubble-card vision-bubble" onClick={handleVisionClick}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={vision} // Replace with an actual image URL
                      alt="Vision"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Vision
                      </Typography>
                      {showVision && (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Our vision is to cultivate an environment that nurtures the intellectual, emotional, and social growth of our students.
                        </Typography>
                      )}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>

              {/* Mission Card */}
              <div className="bubble-card mission-bubble" onClick={handleMissionClick}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={mission} // Replace with an actual image URL
                      alt="Mission"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Mission
                      </Typography>
                      {showMission && (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Our mission is to provide quality education that fosters academic excellence, character development, and social responsibility.
                        </Typography>
                      )}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>

        {/* Contact Us section with background image */}
      <div>
        <section ref={contactRef} className="section contact-section" style={{
          backgroundImage: `url(${contactBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '60px 20px',
          color: 'white'
        }}>
          <div className="contact-container">
            <h2>Contact Us</h2>
            <p>Email: support@sathmaga.com</p>
            <p>Phone: +94 71 234 5678</p>
            <p>Address: Sathmaga Institute, Colombo, Sri Lanka</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
