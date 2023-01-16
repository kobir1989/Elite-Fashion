import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userSignup } from "../actions/authAction";

//Get user info from local storeage.
const getAuthData = localStorage.getItem("jwt") !== null ? JSON.parse(localStorage.getItem("jwt")) : null;

const initialState = {
   loading: false,
   userInfo: getAuthData,
   error: null
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setError: (state, action) => {
         state.error = action.payload
         console.log(action.payload)
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
      });
      builder.addCase(userLogin.rejected, (state, action) => {
         state.loading = false;
         state.isAuth = false;
         state.error = action.payload;
      });

      //user signup
      builder.addCase(userSignup.pending, (state, _action) => {
         state.loading = true;
      });
      builder.addCase(userSignup.fulfilled, (state, action) => {
         state.success = true
         state.loading = false;
         state.isAuth = action.payload
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
export const { setError } = authSlice.actions;