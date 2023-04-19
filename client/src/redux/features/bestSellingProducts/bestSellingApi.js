import { apiSlice } from '../../api/apiSlice';

export const bestSellingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    bestSellingProducts: builder.query({
      query: () => '/product/best-selling',
      keepUnusedDataFor: 5 //remove cache data after 5 seconds.
    })
  })
})

export const { useBestSellingProductsQuery } = bestSellingApi;