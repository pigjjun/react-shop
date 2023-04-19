import React from "react";
import "../../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="credit-cards">
        <img
          src="/creditCards.png"
          alt="credit-cards"
          className="credit-cards-image"
        />
      </div>
      <div className="social-logos">
        <a href="https://www.facebook.com/" target="_blank">
          <img src="/facebook.svg" alt="Facebook" className="sns-logo" />
        </a>
        <a href="https://www.instagram.com/pigjjun" target="_blank">
          <img src="/instagram.svg" alt="Instagram" className="sns-logo" />
        </a>
        <a href="https://github.com/pigjjun" target="_blank">
          <img src="/github.svg" alt="Github" className="sns-logo" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
