import { createSlice } from "@reduxjs/toolkit";
import { fetchSubCategory } from "../actions/subCategoryAction";

const initialState = {
   isLoading: false,
   subCategories: [],
   error: null,
};

const subCategorySlice = createSlice({
   name: "subCategory",
   initialState,
   extraReducers: (builder) => {
      builder.addCase(fetchSubCategory.pending, (state, _action) => {
         state.isLoading = true;
      });
      builder.addCase(fetchSubCategory.fulfilled, (state, action) => {
         state.isLoading = false;
         state.subCategories = action.payload;
      });
      builder.addCase(fetchSubCategory.rejected, (state, action) => {
         state.error = action.error.message;
         state.isLoading = false;
      });
   }
});

export default subCategorySlice.reducer;