import { createSlice } from "@reduxjs/toolkit";
import { fetchSubCategory } from "../actions/subCategoryAction";

const initialState = {
   isLoading: false,
   subCategories: [],
   pagination: null,
   error: null,
   page: 1
};

const subCategorySlice = createSlice({
   name: "subCategory",
   initialState,
   reducers: {
      setSubCategoryPage: (state, action) => {
         state.page = action.payload;
      }
   },
   extraReducers: (builder) => {
      builder.addCase(fetchSubCategory.pending, (state, _action) => {
         state.subCategories = [];
         state.isLoading = true;
         state.error = null;
      });
      builder.addCase(fetchSubCategory.fulfilled, (state, action) => {
         state.subCategories = action.payload.subCategory;
         state.pagination = action.payload.pagination;
         state.isLoading = false;
         state.error = null;
      });
      builder.addCase(fetchSubCategory.rejected, (state, action) => {
         state.error = action.payload;
         state.isLoading = false;
      });
   }
});

export const { setSubCategoryPage } = subCategorySlice.actions;
export default subCategorySlice.reducer;