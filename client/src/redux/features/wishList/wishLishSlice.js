import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   wishListItem: [],
   toggleWishList: false,
}

const wishListSlice = createSlice({
   name: "wishList",
   initialState,
   reducers: {
      addToWishList: (state, action) => {
         const newList = action.payload;
         const existingList = state.wishListItem.find((list) => list.id === newList.id);
         if (!existingList) {
            state.wishListItem.push({
               title: newList.title,
               imageUrl: newList.imageUrl,
               id: newList.id,
               price: newList.price

            });
         } else {
            return;
         }

      },
      removeFromWishList: (state, action) => {
         const findById = state.wishListItem.filter((item) => item.id !== action.payload);
         state.wishListItem = findById;
      },
      setToggleWishList: (state, action) => {
         state.toggleWishList = action.payload
      }

   }
});

export const { addToWishList, removeFromWishList, setToggleWishList } = wishListSlice.actions;
export default wishListSlice.reducer;