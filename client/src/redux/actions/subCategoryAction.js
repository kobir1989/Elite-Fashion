import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchSubCategory = createAsyncThunk("subcategory/fetchSubCategory",
   async (id) => {
      console.log(id, "SLICE")
      const response = await axios.get(`${BASE_URL}/sub-category/${id}`);
      return response.data.subCategories;
   });