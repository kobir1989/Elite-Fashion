import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosBaseUrl } from "../../utils/axios.config";

export const fetchUserInfo = createAsyncThunk(
   "userProfile/fetchUserInfo",
   async ({ id }, { getState, rejectWithValue }) => {
      try {
         const state = getState()
         const response = await axiosBaseUrl.get(`/user/profile/${id}`, {
            headers: {
               "Content-Type": " application/x-www-form-urlencoded",
               "Authorization": `Bearer ${state.auth.token}`
            }
         });
         // console.log(response);
         return response?.data?.user;
      } catch (err) {
         // console.log(err.response);
         return rejectWithValue(err.response);
      }
   }
);

export const updateUserProfile = createAsyncThunk(
   "userProfile/updateUserProfile",
   async ({ id, email, oldPassword, newPassword, confirmNewPassword }, { getState, rejectWithValue }) => {
      try {
         const state = getState()
         const response = await axiosBaseUrl.post(`/user/update/profile/${id}`, {
            oldPassword,
            newPassword,
            confirmNewPassword,
            email
         }, {
            headers: {
               "Content-Type": " application/x-www-form-urlencoded",
               "Authorization": `Bearer ${state.auth.token}`
            }
         });
         // console.log(response);
         return response?.data;
      } catch (err) {
         console.log(err);
         return rejectWithValue(err?.response?.data)
      }
   }
)