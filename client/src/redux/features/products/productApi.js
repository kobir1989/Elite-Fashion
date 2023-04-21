import { apiSlice } from '../../api/apiSlice';

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchPoducts: builder.query({ //fetch 12 products at a time
      query: ({ id, page }) => `/${id}/products?page=${page}&limit=12`
    }),

    fetchSingleProduct: builder.query({ //fetch sigle product
      query: (id) => `/product/single/${id}`
    }),

    bestSellingProducts: builder.query({ //fetch related products
      query: () => '/product/best-selling',
      keepUnusedDataFor: 5 //remove cached data after 5 seconds.
    })
  })
})

export const {
  useFetchPoductsQuery,
  useFetchSingleProductQuery,
  useBestSellingProductsQuery
} = productApi;