import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosBaseUrl } from "../../utils/axios.config";

export const fetchSubCategory = createAsyncThunk("subcategory/fetchSubCategory",
   async (id, { rejectWithValue }) => {
      try {
         console.log(id, "SLICE")
         const response = await axiosBaseUrl.get(`/sub-category/${id}`);
         return response.data.subCategories;
      } catch (err) {
         return rejectWithValue(err?.response?.data);
      }
   });