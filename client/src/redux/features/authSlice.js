import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userSignup, userLogout } from "../actions/authAction";

const initialState = {
   loading: false,
   userInfo: null,
   error: null
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setError: (state, action) => {
         state.error = action.payload
         // console.log(action.payload)
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
         state.userInfo = null;
         state.error = action.payload;
      });

      //user signup
      builder.addCase(userSignup.pending, (state, _action) => {
         state.loading = true;
      });
      builder.addCase(userSignup.fulfilled, (state, action) => {
         state.loading = false;
         state.userInfo = action.payload;
      });
      builder.addCase(userSignup.rejected, (state, action) => {
         state.loading = false;
         state.userInfo = null;
         state.error = action.payload;
         // console.log(action.payload)
      });

      //user loguout
      builder.addCase(userLogout.pending, (state, _action) => {
         state.loading = true;
      });
      builder.addCase(userLogout.fulfilled, (state, action) => {
         state.loading = false;
         state.userInfo = null;
      });
      builder.addCase(userLogout.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload;
         // console.log(action.payload)
      });
   }

});

export default authSlice.reducer;
export const { setError } = authSlice.actions;