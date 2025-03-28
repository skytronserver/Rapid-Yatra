import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserInfo } from '../helper';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
  const user = getUserInfo();
  
  // If not authenticated at all, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // If no specific roles are required or user's role is in the allowed roles list
  if (allowedRoles.length === 0 || (user && allowedRoles.includes(user.role))) {
    return children;
  }
  
  // If authenticated but not authorized, redirect to dashboard (or unauthorized page)
  return <Navigate to="/dashboard" replace />;
};

export default ProtectedRoute; 