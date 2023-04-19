import { createSlice } from "@reduxjs/toolkit";
import { fetchBestSellingProducts } from "../../actions/bestSellingAction";

const initialState = {
   isLoading: false,
   bestSellingProducts: [],
   error: null,
};

const bestSellingSlice = createSlice({
   name: "bestSelling",
   initialState,
   extraReducers: (builder) => {
      builder.addCase(fetchBestSellingProducts.pending, (state, _action) => {
         state.isLoading = true;
      });
      builder.addCase(fetchBestSellingProducts.fulfilled, (state, action) => {
         state.isLoading = false;
         state.bestSellingProducts = action.payload;
      });
      builder.addCase(fetchBestSellingProducts.rejected, (state, action) => {
         state.error = action.payload;
         state.isLoading = false;
      })
   }
});

export default bestSellingSlice.reducer;