import { baseApi } from './baseApi';

const orderAndPaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<any, void>({
      query: () => ({
        url: '/orders/my-orders',
        method: 'GET',
      }),
      providesTags: ['orders'],
    }),
    addOrder: builder.mutation({
      query: (data) => ({
        url: '/orders',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['orders', 'carts'],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['orders'],
    }),
    checkout: builder.mutation({
      query: (data) => ({
        url: '/payments/checkout',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['orders', 'carts'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetOrdersQuery,
  useAddOrderMutation,
  useCheckoutMutation,
  useDeleteOrderMutation,
} = orderAndPaymentApi;
