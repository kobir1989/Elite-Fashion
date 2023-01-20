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
)