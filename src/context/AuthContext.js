import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || null);

  const signup = async (email, password, role = 'user') => {
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }), // Include role in signup
      });
      if (response.ok) {
        return true;
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const signin = async (email, password) => {
    try {
      const response = await fetch(`http://localhost:5000/users?email=${email}`);
      if (response.ok) {
        const users = await response.json();
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          setCurrentUser(user);
          localStorage.setItem('currentUser', JSON.stringify(user)); // Persist login state
          return user.role;
        } else {
          return false;
        }
      } else {
        throw new Error('Signin failed');
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const signout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser'); // Remove user from localStorage
  };

  return (
    <AuthContext.Provider value={{ signup, signin, signout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
