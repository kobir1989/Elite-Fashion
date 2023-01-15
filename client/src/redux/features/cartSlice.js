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
               quantity: newItem.quantity,
               size: newItem.size,
               color: newItem.color
            });
            state.quantity++
            state.totalAmount = state.totalAmount + newItem.price
         } else {
            findExistingItem.quantity++
            state.quantity++
            state.totalAmount = state.totalAmount + newItem.price
         }
      },
      removeOneFromCart: (state, action) => {
         const findById = state.cartItem.find(item => item.id === action.payload);
         if (findById) {
            findById.quantity--;
            state.totalAmount = state.totalAmount - findById.price;
            state.quantity--;
            if (findById.quantity <= 0) {
               const updatedCart = state.cartItem.filter(item => item.id !== action.payload);
               state.cartItem = updatedCart;
            }
         }
      },
      removeFromCart: (state, action) => {
         const findById = state.cartItem.find(item => item.id === action.payload);
         state.quantity = state.quantity - findById.quantity;
         state.totalAmount = state.totalAmount - (findById.price * findById.quantity)
         const updatedCart = state.cartItem.filter((item) => item.id !== action.payload);
         state.cartItem = updatedCart;
      }
   },

});

export const { addToCart, removeOneFromCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;