import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosBaseUrl } from "../../utils/axios.config";

export const fetchCategory = createAsyncThunk("category/fetchCategory",
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosBaseUrl.get(`/categories/all`);
         return response.data.allCategories;
      } catch (err) {
         return rejectWithValue(err?.response?.data)
      }
   });