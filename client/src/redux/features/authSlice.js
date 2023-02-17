import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userSignup } from "../actions/authAction";

const initialState = {
   loading: false,
   userInfo: null,
   token: null,
   error: null,
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setError: (state, action) => {
         state.error = action.payload
         // console.log(action.payload)
      },
      logout: (state, _action) => {
         state.userInfo = null
         state.token = null
      }
   },
   extraReducers: (builder) => {
      //user login
      builder.addCase(userLogin.pending, (state, _action) => {
         state.loading = true
      })
      builder.addCase(userLogin.fulfilled, (state, action) => {
         state.loading = false;
         state.userInfo = action.payload.userPayload;
         state.token = action.payload.token;
      });
      builder.addCase(userLogin.rejected, (state, action) => {
         state.loading = false;
         state.userInfo = null;
         state.token = null;
         state.error = action.payload;
      });

      //user signup
      builder.addCase(userSignup.pending, (state, _action) => {
         state.loading = true;
      });
      builder.addCase(userSignup.fulfilled, (state, action) => {
         state.loading = false;
         state.userInfo = action.payload.userPayload;
         state.token = action.payload.token;
      });
      builder.addCase(userSignup.rejected, (state, action) => {
         state.loading = false;
         state.userInfo = null;
         state.token = null;
         state.error = action.payload;
         // console.log(action.payload)
      });
   }

});

export default authSlice.reducer;
export const { setError, logout } = authSlice.actions;