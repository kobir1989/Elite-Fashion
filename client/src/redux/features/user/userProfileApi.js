import { apiSlice } from '../../api/apiSlice'
import { axiosBaseUrl } from '../../../utils/axios.config'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const userProfileApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUserProile: builder.query({
      query: id => `/user/profile/${id}`,
      providesTags: ['getUserProile'],
      keepUnusedDataFor: 1
    })
  })
})

export const { useGetUserProileQuery } = userProfileApi

//User profile update asyncThunk middleware
export const updateUserProfile = createAsyncThunk(
  'userProfile/updateUserProfile',
  async (
    { id, name, phone, address, email, city, image },
    { getState, rejectWithValue, dispatch }
  ) => {
    try {
      const state = getState()
      const response = await axiosBaseUrl.put(
        `/user/update/profile/${id}`,
        {
          name,
          phone,
          address,
          email,
          city,
          image
        },
        {
          headers: {
            'Content-Type': 'application/json multipart/form-data',
            Authorization: `Bearer ${state.auth.token}`
          }
        }
      )
      dispatch(userProfileApi.util.invalidateTags(['getUserProile']))
      return response?.data
    } catch (err) {
      return rejectWithValue(err?.response?.data)
    }
  }
)
