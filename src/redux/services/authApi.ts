import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from "../../types";


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    authLogin: builder.mutation<IUser, { username: string, password: number, expiresInMins?: number }>({
      query: ({ username, password, expiresInMins }) => ({
        url: '/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          username,
          password,
          expiresInMins // optional, defaults to 60
        }
      }),
      invalidatesTags: ['Auth']
    }),
    authMe: builder.query<IUser, { authorization: string }>({
      query: ({ authorization }) => ({
        url: '/auth/me',
        headers: {
          'Authorization': `Bearer ${authorization}`,
        },
      }),
      providesTags: ['Auth']
    }),
  }),
});

export const { useAuthLoginMutation, useAuthMeQuery } = authApi;
