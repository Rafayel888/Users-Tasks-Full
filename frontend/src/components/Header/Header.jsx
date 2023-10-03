import React from 'react';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectAuth } from '../../redux/slices/auth';
import { logoutUser } from '../../redux/action/auth-act';


export const Header = () => {
  const isAuth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onClickLogout = async () => {
    try {
      await dispatch(logoutUser()); 
    } catch (error) {
      console.error('Error when logging out:', error);
    }
    dispatch(logout());
    navigate('/')
  };

  return (
    <div className={styles.root}>
      <Container maxWidth='lg'>
        <div className={styles.inner}>
          <Link className={styles.logo} to='/profile'>
            <div>Ararat IT school</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to='/tasks'>
                  <Button variant='contained'>Write Task</Button>
                </Link>
                <Button onClick={onClickLogout} variant='contained' color='error'>
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to='/'>
                  <Button variant='outlined'>sign in</Button>
                </Link>
                <Link to='/register'>
                  <Button variant='contained'>sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
