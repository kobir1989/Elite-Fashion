import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosBaseUrl } from "../../utils/axios.config";

export const fetchUserInfo = createAsyncThunk(
   "userProfile/fetchUserInfo",
   async ({ id }, { getState, rejectWithValue }) => {
      const state = getState();
      try {
         const response = await axiosBaseUrl.get(`/user/profile/${id}`, {
            headers: {
               "Content-Type": " application/x-www-form-urlencoded",
               "Authorization": `Bearer ${state.auth.token}`
            }
         });
         return response?.data?.user;
      } catch (error) {
         // console.log(error.response.status);
         return rejectWithValue(error);
      }
   }
);

export const updateUserProfile = createAsyncThunk(
   "userProfile/updateUserProfile",
   async ({ id, name, phone, address, email, city, image }, { getState, rejectWithValue }) => {
      try {
         const state = getState()
         const response = await axiosBaseUrl.put(`/user/update/profile/${id}`, {
            name,
            phone,
            address,
            email,
            city,
            image
         }, {
            headers: {
               'Content-Type': "application/json multipart/form-data",
               "Authorization": `Bearer ${state.auth.token}`
            }
         });
         // console.log(response);
         return response?.data;
      } catch (err) {
         return rejectWithValue(err?.response?.data)
      }
   }
)