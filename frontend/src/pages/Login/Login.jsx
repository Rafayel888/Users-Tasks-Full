import React from 'react';

import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAuth } from '../../redux/slices/auth';
import { fetchAuth } from '../../redux/action/auth-act';

export const Login = () => {
  const isAuth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: 'rafayelmkhitaryan303@gmail.com',
      password: 'asd123',
    },
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    if (!data.payload) {
       reset({
         email: '',
         password: '',
       });
      alert('Either the login or password is incorrect');
      return;
    }

    if ('accessToken' in data.payload) {
      window.localStorage.setItem('token', data.payload.accessToken);
    }
  };

  React.useEffect(() => {
    if (isAuth) {
      navigate('/profile');
    }
  }, [isAuth]);

  
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant='h5'>
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label='E-Mail'
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', {
            required: 'Enter your email',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Invalid email format',
            },
          })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label='Password'
          type='password'
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Enter your password' })}
          fullWidth
        />
        <Button disabled={!isValid} type='submit' size='large' variant='contained' fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
