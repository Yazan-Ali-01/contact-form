import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkSessionStatus } from '../services/apiService';
import CenteredSpinner from './CenteredSpinner';

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSessionStatus()
      .then(data => {
        setIsAuthenticated(data.isAuthenticated);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CenteredSpinner />
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;
