import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const initialState = {
   isLoading: false,
   error: null,
   subCategories: []
};

export const fetchSubCategory = createAsyncThunk("subcategory/fetchSubCategory",
   async (id) => {
      console.log(id, "SLICE")
      const response = await axios.get(`${BASE_URL}/sub-category/${id}`);
      return response.data.subCategories;
   })

const subCategorySlice = createSlice({
   name: "subCategory",
   initialState,
   extraReducers: (builder) => {
      builder.addCase(fetchSubCategory.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(fetchSubCategory.fulfilled, (state, action) => {
         state.isLoading = false;
         state.subCategories = action.payload;
      });
      builder.addCase(fetchSubCategory.rejected, (state, action) => {
         state.error = action.error.message;
         state.isLoading = false;
      });
   }
});

export default subCategorySlice.reducer;