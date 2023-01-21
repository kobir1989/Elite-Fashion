import { createSlice } from "@reduxjs/toolkit";
import { fetchCategory } from "../actions/categoryAction"

const initialState = {
   isLoading: false,
   categories: [],
   error: null,
}

const categorySlice = createSlice({
   name: "category",
   initialState,
   extraReducers: (builder) => {
      builder.addCase(fetchCategory.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(fetchCategory.fulfilled, (state, action) => {
         state.categories = action.payload;
         state.isLoading = false;
      });
      builder.addCase(fetchCategory.rejected, (state, action) => {
         state.error = action.error.message;
         state.isLoading = false
      });
   }

});

export default categorySlice.reducer;