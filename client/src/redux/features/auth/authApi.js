import { apiSlice } from '../../api/apiSlice'
import { loggedIn } from './authSlice'

export const authApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      //Login mutation
      query: data => ({
        url: '/auth/login',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled
          dispatch(
            loggedIn({
              token: response?.data?.token,
              userPayload: response?.data?.userPayload
            })
          )
        } catch (error) {
          //  console.log(error)
        }
      }
    }),

    signup: builder.mutation({
      //signup mutation
      query: data => ({
        url: '/auth/signup',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled
          dispatch(
            loggedIn({
              token: response?.data?.token,
              userPayload: response?.data?.userPayload
            })
          )
        } catch (error) {
          //  console.log(error)
        }
      }
    }),

    logoutRequest: builder.query({
      //logout Query
      query: () => '/auth/logout'
    }),

    forgetPassword: builder.mutation({
      //forgetPassword mutation
      query: data => ({
        url: '/auth/forget/password',
        method: 'POST',
        body: data
      })
    }),
    resetPassword: builder.mutation({
      //resetPassword mutation
      query: ({ resetToken, password, confirmPassword }) => ({
        url: `/auth/reset/password/${resetToken}`,
        method: 'POST',
        body: { password, confirmPassword }
      })
    })
  })
})

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutRequestQuery,
  useForgetPasswordMutation,
  useResetPasswordMutation
} = authApi
