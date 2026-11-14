import { baseApi } from './baseApi';

const ProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: '/products',
        method: 'GET',
        params: params || undefined,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetProductsQuery } = ProductApi;
