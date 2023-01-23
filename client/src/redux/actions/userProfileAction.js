import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosBaseUrl } from "../../utils/axios.config";

export const fetchUserInfo = createAsyncThunk(
   "userProfile/fetchUserInfo",
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosBaseUrl.get(`/user/profile/${id}`);
         console.log(response?.data?.user);
         return response?.data?.user;
      } catch (err) {
         console.log(err);
         return rejectWithValue(err.response);
      }

   }
);

export const updateUserProfile = createAsyncThunk(
   "userProfile/updateUserProfile",
   async ({ id, email, oldPassword, newPassword, confirmNewPassword }, { rejectWithValue }) => {
      try {
         const response = await axiosBaseUrl.post(`/user/update/profile/${id}`, {
            oldPassword,
            newPassword,
            confirmNewPassword,
            email
         });
         // console.log(response);
         return response?.data;
      } catch (err) {
         console.log(err);
         return rejectWithValue(err?.response?.data)
      }
   }
)