import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   page: 1,
};

const productsSlice = createSlice({
   name: "product",
   initialState,
   reducers: {
      setProductPage: (state, action) => {
         state.page = action.payload;
      }
   },
});
export const { setProductPage } = productsSlice.actions;
export default productsSlice.reducer;
