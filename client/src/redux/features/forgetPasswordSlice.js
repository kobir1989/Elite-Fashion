import { createSlice } from "@reduxjs/toolkit";
import { postForgetPassword } from "../actions/forgetPasswordAction";

const initialState = {
   loading: false,
   error: null,
   isRequestSuccess: null
};

const forgetPasswordSlice = createSlice({
   name: "forgetPassword",
   initialState,
   reducers: {
      forgetPasswordError: (state, action) => {
         state.error = action.payload
         // console.log(action.payload)
      },
   },
   extraReducers: (builder) => {
      //Forget-Pasword
      builder.addCase(postForgetPassword.pending, (state, _action) => {
         state.loading = true;
      });
      builder.addCase(postForgetPassword.fulfilled, (state, action) => {
         state.loading = false;
         state.isRequestSuccess = action.payload;
      });
      builder.addCase(postForgetPassword.rejected, (state, action) => {
         state.loading = false;
         state.isRequestSuccess = null;
         state.error = action.payload;
         // console.log(action.payload)
      });

   }

});

export default forgetPasswordSlice.reducer;
export const { forgetPasswordError } = forgetPasswordSlice.actions;