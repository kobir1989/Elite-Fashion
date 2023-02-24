import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosBaseUrl } from "../../utils/axios.config";

export const fetchSubCategory = createAsyncThunk("subcategory/fetchSubCategory",
   async (url, { rejectWithValue }) => {
      try {
         const response = await axiosBaseUrl.get(url);
         // console.log(response.data.subCategory)
         return response?.data;
      } catch (err) {
         return rejectWithValue(err?.response?.data);
      }
   });