import React from 'react';
import './About.css';
import about from './about.jpg';
import teammember1 from './teammember1.jpg';
import teammember2 from './teammember2.jpg';
import teammember3 from './teammember3.jpg';

const About = () => {
  return (
    <div className="container about-section">
      <div className="row">
        <div className="col-5">
          <img src={about} alt="about" className="img-fluid about-image" />
        </div>
        <div className="col-7">
          <h1 className='text-danger'>About Us</h1>
          <p>
            Welcome to our fashion store! We offer a wide range of products that are designed with a focus on 
            quality, comfort, and style. Whether you're looking for the latest trends or timeless classics, 
            we’ve got you covered.
          </p>
          <p>
            Our mission is to provide customers with premium fashion products at affordable prices. 
            With years of experience in the fashion industry, we ensure that each product meets the 
            highest standards of craftsmanship.
          </p>
          <p>
            Join us on this exciting journey, and explore our collections. We hope you enjoy shopping with us!
          </p>
        </div>
      </div>
      <div className="row team-section mt-5">
        <div className="col text-center">
          <h2 className='text-danger'>Meet Our Team</h2>
          <p>
            Our dedicated team of professionals works tirelessly to bring you the best shopping experience.
          </p>
        </div>
      </div>
      <div className="row mt-4 team-members">
        <div className="col-md-4 text-center">
          <img src={teammember1} alt="Team Member 1" className="img-fluid rounded-circle team-image" />
          <h4>John Doe</h4>
          <p>CEO & Founder</p>
        </div>
        <div className="col-md-4 text-center">
          <img src={teammember2} alt="Team Member 2" className="img-fluid rounded-circle team-image" />
          <h4>Jane Smith</h4>
          <p>Lead Designer</p>
        </div>
        <div className="col-md-4 text-center">
          <img src={teammember3} alt="Team Member 3" className="img-fluid rounded-circle team-image" />
          <h4>Mark Johnson</h4>
          <p>Marketing Head</p>
        </div>
      </div>
    </div>
  );
};

export default About;
