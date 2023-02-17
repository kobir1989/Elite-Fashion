import { createSlice } from "@reduxjs/toolkit";
import { postResetPassword } from "../actions/resetPasswordAction"

const initialState = {
   loading: false,
   error: null,
   hasResetSuccess: null,
};

const resetPasswordSlice = createSlice({
   name: "resetPassword",
   initialState,
   reducers: {
      resetPasswordError: (state, action) => {
         state.error = action.payload
         // console.log(action.payload)
      },
   },
   extraReducers: (builder) => {
      //Reset-Pasword
      builder.addCase(postResetPassword.pending, (state, _action) => {
         state.loading = true;
      });
      builder.addCase(postResetPassword.fulfilled, (state, action) => {
         state.loading = false;
         state.hasResetSuccess = action.payload;
      });
      builder.addCase(postResetPassword.rejected, (state, action) => {
         state.loading = false;
         state.hasResetSuccess = null;
         state.error = action.payload;
         // console.log(action.payload)
      });
   }
});

export default resetPasswordSlice.reducer;
export const { resetPasswordError } = resetPasswordSlice.actions;