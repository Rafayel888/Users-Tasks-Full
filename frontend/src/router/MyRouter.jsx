import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from '../pages/Layout';
import { Login } from '../pages/Login/Login';
import { Register } from '../pages/Registration/Register';
import { Profile } from '../pages/Profile';
import { NotFound } from '../pages/NotFound';
import PrivateRoute from '../components/PrivateRoute/ProtectedRoute';
import { Tasks } from '../pages/Tasks';
import { EditAccount } from '../components/UserProfile/EditAccount';

export const MyRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path='profile' element={<Profile />} />
            <Route path='tasks' element={<Tasks />} />
            <Route path='edit/account' element={ <EditAccount/>} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};
