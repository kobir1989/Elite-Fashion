import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userSignup } from "../actions/authAction";

//Get user info from local storeage.
const isAuth = localStorage.getItem("jwt") ? localStorage.getItem("jwt") : null;

const initialState = {
   success: false,
   loading: false,
   isAuth,
   userInfo: {
      id: null,
      name: null,
      role: null
   },
   error: null
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      userInfoData: (state, action) => {
         state.userInfo = action.payload;
      }
   },
   extraReducers: (builder) => {
      //user login
      builder.addCase(userLogin.pending, (state, _action) => {
         state.loading = true
      })
      builder.addCase(userLogin.fulfilled, (state, action) => {
         state.loading = false;
         state.userInfo = action.payload;
         state.success = true
      });
      builder.addCase(userLogin.rejected, (state, action) => {
         state.loading = false;
         state.success = false
         state.error = action.payload;
      });

      //user signup
      builder.addCase(userSignup.pending, (state, _action) => {
         state.loading = true;
      });
      builder.addCase(userSignup.fulfilled, (state, action) => {
         state.success = true
         state.loading = false;
         state.userInfo = action.payload;
      });
      builder.addCase(userSignup.rejected, (state, action) => {
         state.loading = false;
         state.success = false
         state.error = action.payload;
         // console.log(action.payload)
      });
   }

});

export default authSlice.reducer;
export const { userInfoData } = authSlice.actions;