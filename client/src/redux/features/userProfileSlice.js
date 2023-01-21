import { createSlice } from "@reduxjs/toolkit";
import { fetchUserInfo, updateUserProfile } from "../actions/userProfileAction";

const initialState = {
   userProfileData: [],
   error: null,
   isLoading: false,
   updateError: null,
   updateLoading: false,
   updateData: null
};

const userProfileSlice = createSlice({
   name: "userProfile",
   initialState,
   reducers: {
      setHasError: (state, action) => {
         state.updateError = action.payload
      }
   },
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

      // Update profile Post request.
      builder.addCase(updateUserProfile.pending, (state, _action) => {
         state.updateLoading = true;
      });
      builder.addCase(updateUserProfile.fulfilled, (state, action) => {
         state.updateLoading = false;
         state.updateData = action.payload;
      });
      builder.addCase(updateUserProfile.rejected, (state, action) => {
         state.updateError = action.payload;
         state.updateLoading = false;
      });
   }
});

export const { setHasError } = userProfileSlice.actions;
export default userProfileSlice.reducer;