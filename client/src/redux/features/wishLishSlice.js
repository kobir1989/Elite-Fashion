import { createSlice } from "@reduxjs/toolkit";

const getLocalStorage = localStorage.getItem("wishList") !== null ? JSON.parse(localStorage.getItem("wishList")) : [];

const initialState = {
   item: getLocalStorage,
   toggleWishList: false,
}

const wishListSlice = createSlice({
   name: "wishList",
   initialState,
   reducers: {
      addToWishList: (state, action) => {
         const newList = action.payload;
         const existingList = state.item.find((list) => list.id === newList.id);
         if (!existingList) {
            state.item.push({
               title: newList.title,
               imageUrl: newList.imageUrl,
               id: newList.id,
               price: newList.price

            });
         } else {
            return;
         }
         console.log(newList, "REDUX ")

      },
      removeFromWishList: (state, action) => {

      },
      setToggleWishList: (state, action) => {
         state.toggleWishList = action.payload
      }

   }
});

export const { addToWishList, removeFromWishList, setToggleWishList } = wishListSlice.actions;
export default wishListSlice.reducer;