import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosBaseUrl } from "../../utils/axios.config";

export const userLogin = createAsyncThunk(
   "auth/userLogin",
   async ({ email, password }, { rejectWithValue }) => {
      try {
         const response = await axiosBaseUrl.post(`/auth/login`, { email, password });
         console.log(response.data, "RESPONSE")
         return response?.data;
      } catch (err) {
         console.log(err?.response)
         return rejectWithValue(err?.response?.data)
      }
   }
);

export const userSignup = createAsyncThunk(
   "auth/userSignup",
   async ({ firstName, lastName, email, password, confirmPassword }, { rejectWithValue }) => {
      try {
         const response = await axiosBaseUrl.post(`/auth/signup`, {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
         });
         return response?.data;
      } catch (err) {
         return rejectWithValue(err?.response?.data);
      }
   }
);

