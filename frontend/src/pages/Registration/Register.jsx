import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Register.module.scss';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registration } from '../../redux/action/auth-act';
import {
  errorEmail,
  inpErrors,
  selectAuth,
  setErrorEmail,
  setErrors,
} from '../../redux/slices/auth';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const isAuth = useSelector(selectAuth);
  const navigate = useNavigate();
  const repEmailErr = useSelector(errorEmail);
  const allErrors = useSelector(inpErrors);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: 'Raf',
      age: 25,
      email: 'rafayelmkhitaryan303@gmail.com',
      password: 'asd123',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    dispatch(setErrors({ field: 'username', message: '' }));
    dispatch(setErrors({ field: 'age', message: '' }));
    dispatch(setErrors({ field: 'password', message: '' }));
    dispatch(setErrorEmail(''));

    await dispatch(registration(values));

    alert('Please log into your Gmail and follow the link to verify your account');
    reset({
      username: '',
      age: '',
      email: '',
      password: '',
    });
  };

  React.useEffect(() => {
    if (isAuth) {
      navigate('/profile');
    }
  }, [isAuth]);

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant='h5'>
        Account creation
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label='Your Name'
          name='username'
          error={Boolean(errors.name?.message || allErrors?.username)}
          helperText={errors.name?.message || allErrors?.username}
          {...register('username', {
            required: 'Enter your full name',
            pattern: {
              value: /^[A-Za-z]+$/,
            },
          })}
          fullWidth
        />

        <TextField
          className={styles.field}
          label='Age'
          name='age'
          error={Boolean(errors.age?.message || allErrors?.age)}
          helperText={errors.age?.message || allErrors?.age}
          {...register('age', {
            required: 'Enter your age',
            pattern: {
              value: /^\d+$/,
            },
          })}
          fullWidth
        />

        <TextField
          className={styles.field}
          label='E-Mail'
          name='email'
          error={Boolean(errors.email?.message || repEmailErr)}
          helperText={errors.email?.message || repEmailErr}
          {...register('email', {
            required: 'Enter your email',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            },
          })}
          fullWidth
        />

        <TextField
          className={styles.field}
          label='Password'
          name='password'
          type='password'
          error={Boolean(errors.password?.message || allErrors?.password)}
          helperText={errors.password?.message || allErrors?.password}
          {...register('password', { required: 'Enter your password' })}
          fullWidth
        />
        <Button disabled={!isValid} type='submit' size='large' variant='contained' fullWidth>
          Register
        </Button>
      </form>
    </Paper>
  );
};
