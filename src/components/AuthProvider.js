import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]); // Mock user "database"

  // Signup method - adds user to the users array if not already signed up
  const signup = (email, password) => {
    const userExists = users.find((user) => user.email === email);

    if (userExists) {
      alert("User already signed up. Please sign in.");
    } else {
      const newUser = { email, password };
      setUsers([...users, newUser]);
      setCurrentUser({ email });
    }
  };

  // Signin method - checks if user exists in the users array
  const signin = (email, password) => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setCurrentUser({ email });
    } else {
      alert("User not found. Please sign up.");
    }
  };

  const signout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, signup, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
