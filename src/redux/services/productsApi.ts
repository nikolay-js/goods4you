import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from "../../types";


export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    fetchProducts: builder.query<IProduct[], { search: string, limit: number }>({
      query: ({ search = '', limit = 12 }) => ({
        url: `/products/search`,
        params: {
          q: search,
          limit,
        }
      }),
      providesTags: result => ['Products']
    }),
    getProductsById: builder.query<IProduct[], { id: string }>({
      query: ({ id }) => `products/${id}`,
    }),
  }),
});

export const { useFetchProductsQuery, useGetProductsByIdQuery } = productsApi;
