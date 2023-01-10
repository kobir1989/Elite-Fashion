import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/categorySlice";
import subCategoryReducer from '../features/subCategorySlice';
import authReducer from "../features/authSlice";

const store = configureStore({
   reducer: {
      category: categoryReducer,
      subCategory: subCategoryReducer,
      auth: authReducer,
   }
})

export default store;