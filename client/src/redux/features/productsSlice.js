import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../actions/productsAction";

const initialState = {
   isLoading: false,
   products: [],
   page: 1,
   error: null,
};

const productsSlice = createSlice({
   name: "product",
   initialState,
   reducers: {
      loadPage: (state, action) => {
         state.page = action.payload;
      }
   },
   extraReducers: (builder) => {
      builder.addCase(fetchProducts.pending, (state, _action) => {
         state.isLoading = true;
      });
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
         state.products = action.payload;
         state.isLoading = false;
      });
      builder.addCase(fetchProducts.rejected, (state, action) => {
         state.isLoading = false;
         state.error = action.payload;
      });
   }
});
export const { loadPage } = productsSlice.actions;
export default productsSlice.reducer;
