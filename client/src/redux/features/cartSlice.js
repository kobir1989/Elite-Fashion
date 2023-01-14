import { createSlice } from "@reduxjs/toolkit";

const localStorageValue = localStorage.getItem("cartData") !== null ? JSON.parse(localStorage.getItem("cartData")) : [];
// console.log(localStorageValue)
const initialState = {
   cartItem: localStorageValue?.cartItem || [],
   quantity: localStorageValue?.quantity || 0,
   totalAmount: localStorageValue?.totalAmount || 0,
};

const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addToCart: (state, action) => {
         const newItem = action.payload;
         const findExistingItem = state.cartItem.find((item) => item.id === newItem.id);
         if (!findExistingItem) {
            state.cartItem.push({
               title: newItem.title,
               imageUrl: newItem.imageUrl,
               id: newItem.id,
               price: newItem.price,
               quantity: newItem.quantity
            });
            state.quantity++
            state.totalAmount = state.totalAmount + newItem.price
         } else {
            state.quantity++
            state.totalAmount = state.totalAmount + newItem.price
         }
      },
      removeFromCart: (state, action) => {

      }
   },

});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;