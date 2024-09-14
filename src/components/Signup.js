import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';
import './Signup.css';

const Signup = () => {
  const { signup } = useAuth();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isSignedUp = await signup(user, password);
    if (isSignedUp) {
      navigate('/signin');
    } else {
      setError('Signup failed or user already exists. Please try again.');
    }
  };

  return (
    <div className="signup-container signup-container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-lg-8 col-md-10 signup-card shadow-lg p-4">
          <div className="row">
            <div className="col-md-6 d-none d-md-block signup-image"></div>
            <div className="col-md-6 p-4">
              <form onSubmit={handleSubmit} className="signup-form">
                <h2 className="text-center mb-4">Sign Up</h2>
                {error && <p className="text-danger text-center">{error}</p>}
                <div className="form-group mb-3">
                  <label htmlFor="email">UserName</label>
                  <input
                    type="text"
                    id="email"
                    className="form-control"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Name</label>
                  <input
                    type="text"
                    id="email"
                    className="form-control"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3">
                  Sign Up
                </button>
                <div className="text-center">
                  <p>Already signed up? <Link to="/signin">Please sign in</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
