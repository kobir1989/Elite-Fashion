import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosBaseUrl } from "../../utils/axios.config";


export const fetchBestSellingProducts = createAsyncThunk(
   "bestSelling/fetchBestSellingProducts",
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosBaseUrl.get("product/best-selling");
         // console.log(response?.data?.products);
         return response?.data?.products;
      } catch (err) {
         console.log(err);
         return rejectWithValue(err?.response)
      }
   }
);