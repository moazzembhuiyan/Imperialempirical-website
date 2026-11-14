import { baseApi } from './baseApi';

const CartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (data) => ({
        url: '/carts',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['carts'],
    }),
    getCart: builder.query<any, void>({
      query: () => ({
        url: '/carts',
        method: 'GET',
      }),
      providesTags: ['carts'],
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/carts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['carts'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetCartQuery, useAddToCartMutation, useDeleteCartMutation } = CartApi;
