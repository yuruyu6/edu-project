import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../utils/hooks/useAuth';

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!allowedRoles) {
    throw new Error('allowedRoles prop is required');
  }

  return allowedRoles.includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
