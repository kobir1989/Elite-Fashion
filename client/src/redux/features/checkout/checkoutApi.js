import { apiSlice } from '../../api/apiSlice'

export const checkoutApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    postCheckout: builder.mutation({
      query: checkout => ({
        url: `/order/create/${checkout.userId}`,
        method: 'POST',
        body: { checkout }
      })
    })
  })
})

export const { usePostCheckoutMutation } = checkoutApi
