import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleBasedRoute = ({ children, requiredRole }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  if (currentUser.role !== requiredRole) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default RoleBasedRoute;
