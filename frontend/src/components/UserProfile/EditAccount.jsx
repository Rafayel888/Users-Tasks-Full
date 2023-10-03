import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import styles from './User.module.scss';
import { editUser } from '../../redux/action/auth-act';

export const EditAccount = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.data);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: user.username,
      email: user.email,
    },
  });

  const onSubmit = async (data) => {
    const editUserId = {
      ...data,
      id: user.id,
    };
    await dispatch(editUser(editUserId));
    alert('Please refresh the page to see the new data');
  };

  return (
    <div className='container'>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Edit your details</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={styles.wrapper} sx={{ '& > :not(style)': { m: 1 } }}>
          <FormControl variant='standard'>
            <InputLabel htmlFor='name-field'>Your new name</InputLabel>
            <Input
              id='name-field'
              startAdornment={
                <InputAdornment position='start'>
                  <AccountCircle />
                </InputAdornment>
              }
              {...register('username', {
                required: 'Enter your name',
              })}
            />
            {errors.username && <p className='error'>{errors.username.message}</p>}
          </FormControl>

          <FormControl variant='standard'>
            <InputLabel htmlFor='input-with-icon-adornment'>Your new email</InputLabel>
            <Input
              id='input-with-icon-adornment'
              startAdornment={
                <InputAdornment position='start'>
                  <AccountCircle />
                </InputAdornment>
              }
              {...register('email', {
                required: 'Enter your email',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                },
              })}
            />
            {errors.email && <p className='error'>{errors.email.message}</p>}
          </FormControl>
        </Box>
        <Button
          disabled={!isValid}
          style={{ marginTop: '25px' }}
          type='submit'
          size='large'
          variant='contained'
          fullWidth
        >
          Save
        </Button>
      </form>
    </div>
  );
};
