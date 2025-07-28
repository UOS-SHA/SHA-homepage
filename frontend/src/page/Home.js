import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import '../Home.css';

const Home = () => {
  return (
    <div className="wholearea">
      <div className="top-bar">
        <img src="/sha-logo.png" alt="Logo" className="logobox" />
        <div className="nav-content">
          <div className="menu">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
              end
            >
              HOME
            </NavLink>
          </div>
          <div className="menu">
            <NavLink
              to="/members"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              MEMBER
            </NavLink>
          </div>
          <div className="menu">
            <NavLink
              to="/study"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              STUDY
            </NavLink>
          </div>
          <div className="menu">
            <NavLink
              to="/recruit"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              RECRUIT
            </NavLink>
          </div>
        </div>
      </div>
      <div className="home-container">
        <div className="video-box">
          <video src="/homeanimation.mp4" autoPlay muted loop playsInline />
        </div>
      </div>
      <div className="mouse">
        <img src="/mouse.png" alt="scroll" />
      </div>
    </div>
  );
};

export default Home;