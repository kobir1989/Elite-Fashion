import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/categorySlice";
import subCategoryReducer from '../features/subCategorySlice';
import authReducer from "../features/authSlice";
import productReducer from "../features/productsSlice";
import cartReducer from "../features/cartSlice";
import wishListReducer from "../features/wishLishSlice";


const store = configureStore({
   reducer: {
      category: categoryReducer,
      subCategory: subCategoryReducer,
      auth: authReducer,
      product: productReducer,
      cart: cartReducer,
      wishList: wishListReducer
   }
})

export default store;