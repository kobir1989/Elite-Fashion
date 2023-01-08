import React from 'react';
import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../slices/categorySlice";
import subCategoryReducer from '../slices/subCategorySlice';

const store = configureStore({
   reducer: {
      category: categoryReducer,
      subCategory: subCategoryReducer
   }
})

export default store;