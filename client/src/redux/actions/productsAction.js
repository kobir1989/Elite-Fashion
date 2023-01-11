import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchProducts = createAsyncThunk("product/fetchProducts",
   async ({ page, id, }, { rejectWithValue }) => {
      console.log(page, id)
      try {
         const response = await axios.get(`${BASE_URL}/${id}/products?page=${page}&limit=12`);
         console.log(response?.data?.products)
         return response?.data?.products;
      } catch (err) {
         return rejectWithValue(err?.response?.data)
      }
   }

)