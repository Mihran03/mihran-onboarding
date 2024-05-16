// src/AboutUs.js
import React from 'react';
import '../css/aboutus.css';
import { FaClock, FaFilePdf, FaCalendarAlt, FaSpotify, FaCheckSquare, FaUserGraduate } from 'react-icons/fa';
// Assuming you have an image of Mihran
import logo from '../css/logo-no-text.png';

const AboutUs = ({ setLoggedIn }) => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <div className="about-content">
        <img src={logo}  className="logo-image" />
        <p>
          Welcome to our study app! Our mission is to help students and professionals stay organized and focused 
          while studying or working. This app was born out of the need to eliminate the chaos of cluttered, 
          unorganized desktops and countless open tabs. 
        </p>
        <p>Our app features:</p>
        <ul>
          <li><FaClock style={{ color: 'rgba(66, 62, 62)'  }}/> <span>A timer with alarms to help manage study and break periods using the Pomodoro technique</span></li>
          <li><FaFilePdf style={{ color: 'rgba(66, 62, 62)'  }}/> <span>PDF upload and viewing for easy access to study materials</span></li>
          <li><FaCalendarAlt style={{ color: 'rgba(66, 62, 62)'  }}/> <span>A calendar display to keep track of important dates and deadlines</span></li>
          <li><FaSpotify style={{ color: 'rgba(66, 62, 62)'  }}/> <span>Spotify integration for a seamless music experience while studying</span></li>
          <li><FaCheckSquare style={{ color: 'rgba(66, 62, 62)'  }}/> <span>A to-do list to manage tasks efficiently</span></li>
        </ul>
        <p>
          This app was created by Mihran Asadullah, a 3rd-year computer engineering student currently interning 
          at the Centre for Advanced Computing. Mihran's passion for technology and productivity tools drove 
          the development of this app, aiming to provide a streamlined, efficient study experience for everyone.
        </p>
        <p className="creator-info">
          <FaUserGraduate /> <span>Mihran Asadullah <br />
          3rd Year Computer Engineering Student <br />
          Intern at the Centre for Advanced Computing</span>
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
