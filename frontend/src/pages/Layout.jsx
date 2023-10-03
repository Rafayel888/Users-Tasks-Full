import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { useDispatch } from 'react-redux';
import { refreshTokens } from '../redux/action/auth-act';

export const Layout = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const refreshAndFetch = async () => {
      try {
        if (localStorage.getItem('token')) {
          const data = await dispatch(refreshTokens()).unwrap();
          window.localStorage.setItem('token', data.accessToken);
        }
      } catch (error) {
        console.error('Failed to refresh tokens', error);
      }
    };
    refreshAndFetch();
  }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
