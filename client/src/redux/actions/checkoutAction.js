import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosBaseUrl } from "../../utils/axios.config";

export const postCheckoutData = createAsyncThunk(
   "checkout/postCheckout",
   async (checkout, { rejectWithValue }) => {
      try {
         const response = await axiosBaseUrl.post(`/order/create/${checkout.userId}`, { checkout });
         console.log(response, "RESPONSE CHECHOUT")
         return response?.data


      } catch (err) {
         console.log(err)
         return rejectWithValue(err?.message)
      }
   }
);