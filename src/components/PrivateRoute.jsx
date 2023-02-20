import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  return <div>{children}</div>;
};

export default PrivateRoute;
