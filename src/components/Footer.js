import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white text-center py-2">
      <div className="footer-container">
        <p>&copy; 2024 E-Mart</p>
        <div className="footer-links">
          <Link className="footer-link" to="/about">
            <FontAwesomeIcon icon={faInfoCircle} /> About
          </Link>
          <Link className="footer-link" to="/contact">
            <FontAwesomeIcon icon={faPhoneAlt} /> Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
