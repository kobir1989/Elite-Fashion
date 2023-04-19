import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import subCategoryReducer from '../features/subCategory/subCategorySlice';
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import wishListReducer from "../features/wishList/wishLishSlice";
import stepsReducer from "../features/paymentSteps/stepsSlice";
import checkoutReducer from "../features/checkout/checkoutSlice";
import userProfileReducer from "../features/user/userProfileSlice";
import bestSellingReducer from "../features/bestSellingProducts/bestSellingSlice";
import searchReducer from "../features/search/searchSlice";
import forgetPasswordReducer from "../features/auth/forgetPasswordSlice";
import resetPasswordReducer from "../features/auth/resetPasswordSlice";
import reviewReducer from "../features/reviews/reviewSlice";
import { apiSlice } from '../api/apiSlice';

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
   search: searchReducer,
   forgetPassword: forgetPasswordReducer,
   resetPassword: resetPasswordReducer,
   review: reviewReducer,
   [apiSlice.reducerPath]: apiSlice.reducer,

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
      "search",
      "forgetPassword",
      "resetPassword",
      "review"
   ]
}

const persistedReducer = persistReducer(persistConfig, reducers)


const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         thunk: true,
         serializableCheck: false,
      }).concat(apiSlice.middleware),
});

export default store;
