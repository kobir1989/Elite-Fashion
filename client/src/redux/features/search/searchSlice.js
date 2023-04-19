import { createSlice } from "@reduxjs/toolkit";
import { fetchSearchResult } from "../../actions/searchAction";

const initialState = {
   openSearchBox: false,
   searchResult: [],
   error: null
}

const searchSlice = createSlice({
   name: "search",
   initialState,
   reducers: {
      setOpenSearchBox: (state, action) => {
         state.openSearchBox = action.payload
      }
   },
   extraReducers: (builder) => {
      builder.addCase(fetchSearchResult.fulfilled, (state, action) => {
         state.searchResult = action.payload;
      });
      builder.addCase(fetchSearchResult.rejected, (state, action) => {
         state.error = action.payload
      });
   }

});

export const { setOpenSearchBox } = searchSlice.actions

export default searchSlice.reducer;