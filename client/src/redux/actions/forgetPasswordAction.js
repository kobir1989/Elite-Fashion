import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosBaseUrl } from "../../utils/axios.config";

export const postForgetPassword = createAsyncThunk(
   "forgetPassword/postForgetPassword",
   async ({ email }, { rejectWithValue }) => {
      try {
         const response = await axiosBaseUrl.post("/auth/forget/password",
            {
               email
            });
         // console.log(response?.data, "forget_Password_action")
         return response?.data?.success
      } catch (err) {
         return rejectWithValue(err?.response?.data);
      }
   }
);