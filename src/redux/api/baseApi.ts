import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, setUser } from '../slices/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as { auth?: { token?: string } })?.auth?.token;

    if (typeof window !== 'undefined') {
      const signUpToken = localStorage.getItem('signupToken');
      const forgetPassToken = localStorage.getItem('forgetPassToken');

      if (signUpToken) {
        headers.set('token', signUpToken);
      }

      if (token) {
        headers.set('Authorization', token);
      } else if (forgetPassToken) {
        headers.set('Authorization', forgetPassToken);
      } else if (signUpToken) {
        headers.set('Authorization', signUpToken);
      }
    } else if (token) {
      headers.set('Authorization', token);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401 && typeof window !== 'undefined') {
    const refreshToken = localStorage.getItem('refreshToken');
    const currentToken = (api.getState() as { auth?: { token?: string } })?.auth?.token;

    if (refreshToken) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
          credentials: 'include',
        });

        const data = await res.json();
        if (data?.data?.accessToken) {
          const user = (api.getState() as { auth?: { user?: unknown } }).auth?.user;

          api.dispatch(
            setUser({
              user,
              token: data.data.accessToken,
            })
          );

          result = await baseQuery(args, api, extraOptions);
        } else if (currentToken) {
          api.dispatch(logout());
        }
      } catch {
        if (currentToken) {
          api.dispatch(logout());
        }
      }
    } else if (currentToken) {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['carts', 'user', 'orders', 'gallery'],
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
