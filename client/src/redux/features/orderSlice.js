import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   phone: "",
   address: "",
   city: "",
   userId: null,
   hasError: false,
   order: null,
   paymentId: null
};

const orderSlice = createSlice({
   name: "order",
   initialState,
   reducers: {
      setShipmentDetails: (state, action) => {
         const { address, phone, city, userId } = action.payload;
         console.log(address, phone, city, userId)
         state.phone = phone;
         state.address = address;
         state.city = city;
         state.userId = userId
      },
      setOrder: (state, action) => {
         state.order = action.payload;
      },
      setPayment: (state, action) => {
         state.paymentId = action.payload;
      }

   }
});

export const { setShipmentDetails, setOrder, setPayment } = orderSlice.actions;

export default orderSlice.reducer;