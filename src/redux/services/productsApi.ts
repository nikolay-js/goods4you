import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from "../../types";


export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    fetchProducts: builder.query<IProduct[], { search: string, limit?: number, skip: number, authorization: string }>({
      query: ({ search = '', limit = 12, skip, authorization }) => ({
        url: `/products/search`,
        headers: {
          'Authorization': `Bearer ${authorization}`,
          'Content-Type': 'application/json'
        },
        params: {
          q: search,
          limit,
          skip,
        }
      }),
      providesTags: ['Products']
    }),
    getProductsById: builder.query<IProduct[], { id: string, authorization: string }>({
      query: ({ id, authorization }) => ({
        url: `products/${id}`,
        headers: {
          'Authorization': `Bearer ${authorization}`,
          'Content-Type': 'application/json'
        },
      }),
      providesTags: ['Products']
    }),
  }),
});

export const { useFetchProductsQuery, useGetProductsByIdQuery } = productsApi;
