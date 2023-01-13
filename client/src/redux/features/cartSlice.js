import { createSlice } from "@reduxjs/toolkit";



const initialState = {
   cart: [],
   wishList: [],
   quantity: 0,
   totalAmount: 0,
};

const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addToCart: (state, action) => {

      },
      removeFromCart: (state, action) => {

      }
   },

});

const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;