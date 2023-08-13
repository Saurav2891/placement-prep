// import React from 'react';
import './FooterSection.css';
const FooterSection = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3>Contact Us</h3>
          <p>123 Placement Street<br />City, Country</p>
          <ul className="social-links">
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Testimonials</h3>
          <p>This platform helped me tremendously in preparing for my interviews. Highly recommended</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;