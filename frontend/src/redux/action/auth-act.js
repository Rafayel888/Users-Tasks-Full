import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';
import { setErrorEmail, setErrors } from "../slices/auth";

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
  try {
    const { data } = await axios.post('/login', params);
    return data
  } catch (error) {
    console.log(error);
  }
})

export const refreshTokens = createAsyncThunk('auth/refreshToken', async () => {
  try {
    const { data } = await axios.get('/refresh');
    return data
  } catch (error) {
    console.log(error);
  }
})


export const registration = createAsyncThunk('register/fetchRegister', async (params, { dispatch }) => {
  try {
    const { data } = await axios.post('/registration', params);
    return data;
  } catch (error) {
    if (error.response && error.response.data.errors) {
      error.response.data.errors.forEach((errorObj) => {
        const { path, msg } = errorObj;
        dispatch(setErrors({ field: path, message: msg }));
      });
      dispatch(setErrorEmail(error.response.data));
    }
    throw error;
  }
})

export const editUser = createAsyncThunk('auth/fetchEditUser', async (params) => {
  const { data } = await axios.patch(`/user/update/${params.id}`,params);
  console.log(data,'PatchUser',params);
  return data;
})

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await axios.post('/logout');
});