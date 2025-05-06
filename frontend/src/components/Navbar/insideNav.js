import React from 'react';
import './insidenav.css'; 

const InsideNav = () => {
    return (
        <nav className='inside-nav'>
            <div className='nav-left'>
                 <img src="/sathmagalogo.png" alt="Sathmaga Logo" className="logo" />
                 <h3 className='titlw'>සත්මග  අධ්‍යාපන ආයතනය</h3>

            </div>

            <div className='nav-right'>
            
                <img
                  src="./sathmagalogo.png"alt="Profile" className="profile-pic"
                />

                <button className="logout-btn">Logout</button>

                 
            </div>

        </nav>
    );
};

export default InsideNav;