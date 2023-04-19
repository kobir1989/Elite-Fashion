import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../../actions/productsAction";

const initialState = {
   isLoading: false,
   products: [],
   page: 1,
   pagination: null,
   error: null,
};

const productsSlice = createSlice({
   name: "product",
   initialState,
   reducers: {
      setProductPage: (state, action) => {
         state.page = action.payload;
      }
   },
   extraReducers: (builder) => {
      builder.addCase(fetchProducts.pending, (state, _action) => {
         state.products = []
         state.isLoading = true;
      });
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
         state.products = action.payload.products;
         state.pagination = action.payload.pagination
         state.isLoading = false;
      });
      builder.addCase(fetchProducts.rejected, (state, action) => {
         state.isLoading = false;
         state.error = action.payload;
      });
   }
});
export const { setProductPage } = productsSlice.actions;
export default productsSlice.reducer;
