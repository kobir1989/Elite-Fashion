import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
});

export const { setShipmentDetails, setOrder, setPayment } = checkoutSlice.actions;

export default checkoutSlice.reducer;