import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/hooks/useAuth';

const Logout = () => {
  const { signout } = useAuth();

  signout();

  return <Navigate to="/" />;
};

export default Logout;
