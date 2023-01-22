import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import subCategoryReducer from '../features/subCategorySlice';
import authReducer from "../features/authSlice";
import productReducer from "../features/productsSlice";
import cartReducer from "../features/cartSlice";
import wishListReducer from "../features/wishLishSlice";
import stepsReducer from "../features/stepsSlice";
import checkoutReducer from "../features/checkoutSlice";
import userProfileReducer from "../features/userProfileSlice";
import bestSellingReducer from "../features/bestSellingSlice";
import searchReducer from "../features/searchSlice";
const reducers = combineReducers({
   subCategory: subCategoryReducer,
   auth: authReducer,
   product: productReducer,
   cart: cartReducer,
   wishList: wishListReducer,
   steps: stepsReducer,
   checkout: checkoutReducer,
   userProfile: userProfileReducer,
   bestSelling: bestSellingReducer,
   search: searchReducer

});

const persistConfig = {
   key: "root",
   storage,
   blacklist: [
      "category",
      "subCategory",
      "product",
      "steps",
      "order",
      "userProfile",
      "bestSelling",
      "search"
   ]
}
const persistedReducer = persistReducer(persistConfig, reducers)
const store = configureStore({
   reducer: persistedReducer,
   middleware: [thunk]
});

export default store;