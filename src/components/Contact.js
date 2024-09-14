import React from 'react';
import contact1 from './contact1.jpg';
import about from './about.jpg';
import { FaWhatsapp, FaFacebook, FaTwitter } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-section container">
      <div className="row">
        {/* Image Section */}
        <div className="col-lg-5 col-md-12 d-none d-lg-block">
          <img src={contact1} alt="Contact" className="img-fluid contact-image mb-4" />
          <img src={about} alt="About" className="img-fluid contact-image" />
        </div>

        {/* Contact Form Section */}
        <div className="col-lg-6 col-md-12 contact-form-container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you! Send us a message, and we'll respond as soon as possible.</p>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea className="form-control" id="message" rows="5" placeholder="Write your message"></textarea>
            </div>
            <button type="submit" className="btn btn-danger btn-block">Send Message</button>
          </form>

          {/* Social Sharing Section */}
          <div className="social-icons mt-4">
            <p>Share with your friends:</p>
            <a href="https://wa.me/?text=Check+out+this+awesome+website!" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">
              <FaWhatsapp size={30} />
            </a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=https://yourwebsite.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
              <FaFacebook size={30} />
            </a>
            <a href="https://twitter.com/intent/tweet?text=Check+out+this+awesome+website!&url=https://yourwebsite.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
              <FaTwitter size={30} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
