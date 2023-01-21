import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const postCheckoutData = createAsyncThunk(
   "checkout/postCheckout",
   async (checkout, { rejectWithValue }) => {
      try {
         const response = await axios.post(`${BASE_URL}/order/create/${checkout.userId}`, { checkout });
         console.log(response, "RESPONSE CHECHOUT")
         return response?.data


      } catch (err) {
         console.log(err)
         return rejectWithValue(err?.message)
      }
   }
);