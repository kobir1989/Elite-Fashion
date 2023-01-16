import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosBaseUrl } from "../../utils/axios.config";

export const userLogin = createAsyncThunk(
   "auth/userLogin",
   async ({ email, password }, { rejectWithValue }) => {
      try {
         const response = await axiosBaseUrl.post(`/auth/login`, { email, password });

         if (window !== "undefined") {
            localStorage.setItem("jwt", JSON.stringify(response.data.userPayload))
         }
         return response?.data.userPayload;
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

         if (window !== "undefined") {
            localStorage.setItem("jwt", JSON.stringify(response.data.userPayload))
         }
         return response.data;
      } catch (err) {
         return rejectWithValue(err?.response?.data)
      }
   }
)


