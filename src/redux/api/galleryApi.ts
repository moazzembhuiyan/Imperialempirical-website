import { baseApi } from './baseApi';

const GalleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGallery: builder.query<any, { page?: number; limit?: number } | void>({
      query: (params) => ({
        url: '/galleries',
        method: 'GET',
        params: params || undefined,
      }),
      providesTags: ['gallery'],
    }),
  }),
  overrideExisting: true,
});

export const { useGetGalleryQuery } = GalleryApi;
