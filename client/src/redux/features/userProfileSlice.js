import { createSlice } from "@reduxjs/toolkit";
import { fetchUserInfo } from "../actions/userProfileAction";

const initialState = {
   userProfileData: [],
   error: null,
   isLoading: false
};

const userProfileSlice = createSlice({
   name: "userProfile",
   initialState,
   extraReducers: (builder) => {
      builder.addCase(fetchUserInfo.pending, (state, _action) => {
         state.isLoading = true;
      });
      builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
         state.isLoading = false;
         state.userProfileData = action.payload;
      });
      builder.addCase(fetchUserInfo.rejected, (state, action) => {
         state.error = action.payload;
         state.isLoading = false;
      });
   }
});

export default userProfileSlice.reducer;