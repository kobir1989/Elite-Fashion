import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   page: 1
};

const subCategorySlice = createSlice({
   name: "subCategory",
   initialState,
   reducers: {
      setSubCategoryPage: (state, action) => {
         state.page = action.payload;
      }
   },
});

export const { setSubCategoryPage } = subCategorySlice.actions;
export default subCategorySlice.reducer;