import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosBaseUrl } from "../../utils/axios.config";

export const postCheckoutData = createAsyncThunk(
   "checkout/postCheckout",
   async (checkout, { getState, rejectWithValue }) => {
      try {
         const state = getState()
         const response = await axiosBaseUrl.post(`/order/create/${checkout.userId}`, { checkout }, {
            headers: {
               "Content-Type": " application/x-www-form-urlencoded",
               "Authorization": `Bearer ${state.auth.token}`
            }
         });
         // console.log(response, "RESPONSE CHECKOUT")
         return response?.data
      } catch (err) {
         // console.log(err)
         return rejectWithValue(err?.message)
      }
   }
);