import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/slices/auth';
import { LoadingSnipet } from '../Loading/LoadingSnipet';

const PrivateRoute = () => {
  const isAuth = useSelector(selectAuth);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  }, []);

  if (isLoading) {
    return <LoadingSnipet />;
  }

  return isAuth ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoute;
