import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchUserInfo = createAsyncThunk(
   "userProfile/fetchUserInfo",
   async (id, { rejectWithValue }) => {
      try {
         const response = await axios.get(`${BASE_URL}/user/profile/${id}`);
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
         const response = await axios.post(`${BASE_URL}/user/update/profile/${id}`, {
            oldPassword,
            newPassword,
            confirmNewPassword,
            email
         });
         console.log(response);
         return response?.data;
      } catch (err) {
         console.log(err);
         return rejectWithValue(err?.response?.data)
      }
   }
)