import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosBaseUrl } from "../../utils/axios.config";

export const postResetPassword = createAsyncThunk(
   "resetPassword/postResetPassword",
   async ({ password, confirmPassword, resetToken }, { rejectWithValue }) => {
      try {
         const response = await axiosBaseUrl.post(`/auth/reset/password/${resetToken}`,
            {
               password,
               confirmPassword
            });
         // console.log(response?.data, "reset_password_action")
         return response?.data?.success;
      } catch (err) {
         return rejectWithValue(err?.response?.data);
      }
   }
);