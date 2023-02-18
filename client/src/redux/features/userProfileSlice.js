import { createSlice } from "@reduxjs/toolkit";
import { fetchUserInfo, updateUserProfile } from "../actions/userProfileAction";

const initialState = {
   userProfileData: {},
   userOrderData: [],
   error: null,
   isLoading: false,
   updateSuccess: null
};

const userProfileSlice = createSlice({
   name: "userProfile",
   initialState,
   reducers: {
      setHasError: (state, action) => {
         state.isLoading = false
         state.error = action.payload
      }
   },
   extraReducers: (builder) => {
      builder.addCase(fetchUserInfo.pending, (state, _action) => {
         state.isLoading = true;
      });
      builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
         state.isLoading = false
         const profileData = action.payload;
         const orderArr = profileData?.purchases.find(item => item.product);
         state.userOrderData = orderArr?.product;

         state.userProfileData = {
            name: profileData?.name,
            email: profileData?.email,
            _id: profileData?._id,
            city: profileData?.city,
            phone: profileData?.phone,
            address: profileData?.address,
            time: profileData?.createdAt,
            status: orderArr?.orderStatus,
            profilePic: profileData?.image

         };
         state.error = null
      });

      builder.addCase(fetchUserInfo.rejected, (state, action) => {
         state.error = action.payload;
         state.isLoading = false;
      });

      // Update profile Post request.
      builder.addCase(updateUserProfile.pending, (state, _action) => {
         state.isLoading = true;
      });
      builder.addCase(updateUserProfile.fulfilled, (state, action) => {
         state.isLoading = false;
         state.updateSuccess = action.payload;
         state.error = null
      });
      builder.addCase(updateUserProfile.rejected, (state, action) => {
         state.error = action.payload;
         state.isLoading = false;
      });
   }
});

export const { setHasError } = userProfileSlice.actions;
export default userProfileSlice.reducer;