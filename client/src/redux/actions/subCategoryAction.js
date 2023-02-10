import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosBaseUrl } from "../../utils/axios.config";

export const fetchSubCategory = createAsyncThunk("subcategory/fetchSubCategory",
   async (url, { rejectWithValue }) => {
      try {
         console.log(url, "SLICE")
         const response = await axiosBaseUrl.get(url);
         // console.log(response.data.subCategory)
         return response?.data?.subCategory;
      } catch (err) {
         return rejectWithValue(err?.response?.data);
      }
   });