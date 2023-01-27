import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosBaseUrl } from "../../utils/axios.config";

export const fetchProducts = createAsyncThunk("product/fetchProducts",
   async (url, { rejectWithValue }) => {
      try {
         const response = await axiosBaseUrl.get(url);
         // console.log(response?.data?.products)
         return response?.data?.products;
      } catch (err) {
         return rejectWithValue(err)
      }
   }
);