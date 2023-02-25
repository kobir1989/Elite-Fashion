import { createSlice } from "@reduxjs/toolkit";
import { postCheckoutData } from "../actions/checkoutAction"

const initialState = {
   error: null,
   response: null,
   isLoading: false,
   phone: "",
   address: "",
   city: "",
   userId: null,
   hasError: false,
   order: [],
   totalAmount: 0,
   paymentId: null,
};

const checkoutSlice = createSlice({
   name: "checkout",
   initialState,
   reducers: {
      setShipmentDetails: (state, action) => {
         const { address, phone, city, userId } = action.payload;
         state.phone = phone;
         state.address = address;
         state.city = city;
         state.userId = userId
      },
      setOrder: (state, action) => {
         state.order = action.payload.product;
         state.totalAmount = action.payload.totalAmount
      },
      setPayment: (state, action) => {
         state.paymentId = action.payload;
      }

   },
   extraReducers: (builder) => {
      builder.addCase(postCheckoutData.pending, (state, _action) => {
         state.isLoading = true;
      });
      builder.addCase(postCheckoutData.fulfilled, (state, action) => {
         state.isLoading = false;
         state.response = action.payload;
      });
      builder.addCase(postCheckoutData.rejected, (state, action) => {
         state.isLoading = false;
         state.error = action.payload;
      });
   }
});

export const { setShipmentDetails, setOrder, setPayment } = checkoutSlice.actions;

export default checkoutSlice.reducer;