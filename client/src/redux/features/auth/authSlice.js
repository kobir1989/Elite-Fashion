import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   userInfo: null,
   token: null,
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      loggedIn: (state, action) => {
         state.token = action.payload.token
         state.userInfo = action.payload.userPayload
      },
      logout: (state, _action) => {
         state.userInfo = null
         state.token = null
      }
   },
});

export default authSlice.reducer;
export const { setError, logout, loggedIn } = authSlice.actions;