import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosBaseUrl } from "../../utils/axios.config";

export const fetchSearchResult = createAsyncThunk(
   "search/fetchSearchResult",
   async (key, { rejectWithValue }) => {
      // console.log(key, "ACTION")
      try {
         if (key) {
            const response = await axiosBaseUrl.get(`search/${key}`);
            console.log(response)
            return response?.data
         }
      } catch (err) {
         console.log(err);
         return rejectWithValue(err?.response?.data)
      }
   }
);