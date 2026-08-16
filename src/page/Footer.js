import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-left">
          <img src={`${process.env.PUBLIC_URL}/sha-logo.png`} alt="SHA Logo" className="footer-logo" />
          <p className="footer-desc">
            uos hacking club<br />
            서울시립대학교 정보보안 소모임 
          </p>
          <p className="footer-desc">developed by 김주현, 성수현<br/>
                designed by @qwerty_1207hy, @izizl.y<br/>
          </p>
        </div>

        <div className="footer-right">
          <div className="footer-links">
            <Link to="/members">MEMBER</Link>
            <Link to="/study">STUDY</Link>
            <Link to="/faq">FAQ</Link>
          </div>
          <div className="footer-contact">
            <p> 
                2026 회장 박정빈 010-5969-7249<br/>
                2026 부회장 한건우 010-5602-9643
            </p>
            <p>© 2025. minnnjuuu All rights reserved.</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 SHA. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
