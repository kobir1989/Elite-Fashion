import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   activeStep: 0
}

const stepsSlice = createSlice({
   name: "steps",
   initialState,
   reducers: {
      increaseStep: (state, _action) => {
         state.activeStep++
      },
      decreaseStep: (state, _action) => {
         state.activeStep--
      },
   }
});

export const { increaseStep, decreaseStep } = stepsSlice.actions;
export default stepsSlice.reducer;