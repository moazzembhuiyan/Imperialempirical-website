import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  user: null,
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;

      if (token) {
        Cookies.set('empirical-accessToken', token, {
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        });
      }
    },

    logout: (state) => {
      Cookies.remove('empirical-accessToken', { path: '/' });
      if (typeof window !== 'undefined') {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('signupToken');
        localStorage.removeItem('forgetPassToken');
      }
      state.user = null;
      state.token = '';
    },
  },
});

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
