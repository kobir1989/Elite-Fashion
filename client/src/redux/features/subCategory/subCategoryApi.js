import { apiSlice } from '../../api/apiSlice'

export const subCategoryApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getSubCategories: builder.query({
      query: ({ id, page }) => `sub-category/related/${id}?page=${page}&limit=7`
    })
  })
})

export const { useGetSubCategoriesQuery } = subCategoryApi
