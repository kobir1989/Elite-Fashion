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
         const orderArr = profileData.purchases.map((order) => (
            {
               products: order.product,
               status: order.orderStatus,
               date: order.createdAt,
               id: order._id,
               totalAmount: order.totalAmount
            }
         ));

         //User purchase PRoducts
         state.userOrderData = orderArr

         //User PRofile data
         state.userProfileData = {
            name: profileData?.name,
            email: profileData?.email,
            _id: profileData?._id,
            city: profileData?.city,
            phone: profileData?.phone,
            address: profileData?.address,
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