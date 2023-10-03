import { createSlice } from "@reduxjs/toolkit";
import { fetchAuth, refreshTokens, registration } from "../action/auth-act";

const initialState = {
  data: null,
  users: [],
  errors: {
    username: '',
    age: '',
    email: '',
    password: '',
  },
  errorEmail: '',
  status: 'loading',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      window.localStorage.removeItem('token');
    },
    setErrors: (state, action) => {
      const { field, message } = action.payload;
      state.errors[field] = message;
    },
    setErrorEmail: (state, action) => {   
      if (action.payload?.message == '') {
        state.errorEmail = '';
      } else {
        state.errorEmail = action.payload.message;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.data = null;
        state.status = 'loading'
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'loaded'
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.data = null;
        state.status = 'error'
      })
      .addCase(registration.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'loaded';
      })
      .addCase(registration.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(refreshTokens.pending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(refreshTokens.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'loaded';
      })
      .addCase(refreshTokens.rejected, (state) => {
        state.data = null;
        state.status = 'error';
      });
  }
})

export const selectAuth = (state) => state.auth.status === 'loaded' && Boolean(state.auth.data?.user?.isActivated);
export const selectedUs = (state) => state.auth.data.user.id;
export const errorEmail = (state) => state.auth.errorEmail;
export const inpErrors = (state) => state.auth.errors;
export const { logout, setErrors, setErrorEmail } = authSlice.actions

export default authSlice.reducer;