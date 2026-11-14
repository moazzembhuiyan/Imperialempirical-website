import { baseApi } from './baseApi';

const termsAndPrivecyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditionsPrivecy: builder.query<any, void>({
      query: () => ({
        url: '/contents',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetTermsAndConditionsPrivecyQuery } = termsAndPrivecyApi;
