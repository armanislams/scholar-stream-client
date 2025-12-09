import React from 'react';
import useAuth from '../hooks/UseAuth';
import useRole from '../hooks/useRole';
import Loader from '../components/Loader';
import Unauthorized from '../pages/Errors/Unauthorized';

const RiderRoute = ({ children }) => {
  const { loading ,user} = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || !user || roleLoading) {
    return <Loader />;
  }

  if (role !== 'rider' ) {
    return <Unauthorized />;
  }
  return children;
};

export default RiderRoute;