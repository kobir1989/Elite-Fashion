import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchCategory = createAsyncThunk("category/fetchCategory",
   async () => {
      const response = await axios.get(`${BASE_URL}/categories/all`);
      return response.data.allCategories;
   });