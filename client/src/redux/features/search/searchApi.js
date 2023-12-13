import { apiSlice } from '../../api/apiSlice'

export const searchApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getSearchResult: builder.query({
      query: key => `/search/${key}`
    })
  })
})

export const { useGetSearchResultQuery } = searchApi
