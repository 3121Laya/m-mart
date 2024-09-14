import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';
import './Signin.css';

const Signin = () => {
  const { signin, currentUser } = useAuth();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect if already signed in
  if (currentUser) {
    navigate("/home");
    console.log("user login details",currentUser)
    return null; // Prevents further rendering
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isSignedIn = await signin(user, password);
    if (isSignedIn) {
      navigate('/home');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className=".sign-container signin-container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-lg-8 col-md-10 signin-card shadow-lg p-4">
          <div className="row">
            <div className="col-md-6 d-none d-md-block signin-image">
              
            </div>
            <div className="col-md-6 p-4">
              <form onSubmit={handleSubmit} className="signin-form">
                <h2 className="text-center mb-4">Sign In</h2>
                {error && <p className="text-danger text-center">{error}</p>}
                <div className="form-group mb-3">
                  <label htmlFor="email">UserName</label>
                  <input
                    type="text"
                    id="text"
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
                <button type="submit" className="btn btn-primary w-100 mb-3">
                  Sign In
                </button>
                <div className="text-center">
                  <p>New user? <Link to="/signup">Please sign up</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
