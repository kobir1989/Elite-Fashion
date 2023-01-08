import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const initialState = {
   isLoading: false,
   error: null,
   categories: []
}

export const fetchCategory = createAsyncThunk("category/fetchCategory",
   async () => {
      const response = await axios.get(`${BASE_URL}/categories/all`);
      return response.data.allCategories;
   })

const categorySlice = createSlice({
   name: "category",
   initialState,
   extraReducers: (builder) => {
      builder.addCase(fetchCategory.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(fetchCategory.fulfilled, (state, action) => {
         state.categories = action.payload;
         state.isLoading = false;
      });
      builder.addCase(fetchCategory.rejected, (state, action) => {
         state.error = action.error.message;
      });
   }

});

export default categorySlice.reducer;