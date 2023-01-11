import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchCategory = createAsyncThunk("category/fetchCategory",
   async (_, { rejectWithValue }) => {
      try {
         const response = await axios.get(`${BASE_URL}/categories/all`);
         return response.data.allCategories;
      } catch (err) {
         return rejectWithValue(err?.response?.data)
      }
   });