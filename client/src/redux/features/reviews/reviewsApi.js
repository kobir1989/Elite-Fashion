import { apiSlice } from '../../api/apiSlice'

export const reviewsApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    //fetch all the reviews related to single product, based on product id.
    getReviews: builder.query({
      query: id => `/reviews/product/${id}`,
      providesTags: ['getReviews']
    }),
    //fetch single review
    getSelectedReview: builder.query({
      query: id => `/review/details/${id}`
    }),
    //Create new review
    addReview: builder.mutation({
      query: data => ({
        url: '/review/create',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['getReviews']
    }),
    //update existing review
    uppdateReview: builder.mutation({
      query: ({ reviewId, data }) => ({
        url: `/review/update/${reviewId}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['getReviews']
    }),
    deleteReview: builder.mutation({
      query: id => ({
        url: `/review/delete/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['getReviews']
    })
  })
})

export const {
  useGetReviewsQuery,
  useAddReviewMutation,
  useDeleteReviewMutation,
  useGetSelectedReviewQuery,
  useUppdateReviewMutation
} = reviewsApi
