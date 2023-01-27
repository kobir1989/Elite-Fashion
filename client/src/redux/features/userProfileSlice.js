import { createSlice } from "@reduxjs/toolkit";
import { fetchUserInfo, updateUserProfile } from "../actions/userProfileAction";

const initialState = {
   userProfileData: {},
   userOrderData: [],
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
         state.isLoading = false
         const profileData = action.payload;
         const isProfileData = profileData?.purchases.find(item => item.product);
         state.userOrderData = isProfileData?.product;

         state.userProfileData = {
            name: profileData?.name,
            email: profileData?.email,
            _id: profileData?._id,
            city: isProfileData?.city,
            phone: isProfileData?.phoneNumber,
            address: isProfileData?.shippingAddress,
            time: isProfileData?.createdAt,
            status: isProfileData?.orderStatus

         };
         // console.log(isProfileData, "FFF")
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