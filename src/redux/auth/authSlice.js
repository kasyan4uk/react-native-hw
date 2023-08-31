import { createSlice } from '@reduxjs/toolkit';

import { authSignUp, authSignIn, authLogOut } from './authOperations';

const initialState = {
  user: {
    uid: '',
    avatarUrl: null,
    login: '',
    email: '',
  },
  isAuth: false,
  error: null,
  isFetching: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload.user;
      state.isAuth = payload.isAuth;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(authSignUp.pending, (state) => {
        state.error = null;
        state.isFetching = true;
      })
      .addCase(authSignUp.fulfilled, (state, { payload }) => {
        state.error = null;
        state.isFetching = false;
        state.isAuth = true;
        state.user = payload;
      })
      .addCase(authSignUp.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })
      .addCase(authSignIn.pending, (state) => {
        state.error = null;
        state.isFetching = true;
      })
      .addCase(authSignIn.fulfilled, (state, { payload }) => {
        state.error = null;
        state.isFetching = false;
        state.isAuth = true;
        state.user = payload;
      })
      .addCase(authSignIn.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      })
      .addCase(authLogOut.pending, (state) => {
        state.error = null;
        state.isFetching = true;
      })
      .addCase(authLogOut.fulfilled, (state) => {
        state.error = null;
        state.isFetching = false;
        state.isAuth = false;
        state.user = initialState.user;
      })
      .addCase(authLogOut.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
        state.isAuth = false;
        state.user = initialState.user;
      });
  },
});

export const { setUser, setError } = authSlice.actions;
