import { createSlice } from "@reduxjs/toolkit";
import { fetchReviews, createReview } from "../actions/reviewActions";

const initialState = {
   reviews: [],
   isLoading: false,
   hasError: null,
   newReview: null
}

const reviewSlice = createSlice({
   name: "review",
   initialState,
   extraReducers: (builder) => {
      //Fetch reviews
      builder.addCase(fetchReviews.pending, (state, _action) => {
         state.isLoading = true;
         state.hasError = null;
         state.reviews = [];
      });
      builder.addCase(fetchReviews.fulfilled, (state, action) => {
         state.isLoading = false;
         state.hasError = null;
         state.reviews = action.payload
      });
      builder.addCase(fetchReviews.rejected, (state, action) => {
         state.reviews = [];
         state.isLoading = false;
         state.hasError = action.payload;
      });

      //create new Review 
      builder.addCase(createReview.pending, (state, _action) => {
         state.isLoading = true;
         state.hasError = null;
      });
      builder.addCase(createReview.fulfilled, (state, action) => {
         state.isLoading = false;
         state.hasError = null;
         state.newReview = action.payload
      });
      builder.addCase(createReview.rejected, (state, action) => {
         state.newReview = null;
         state.isLoading = false;
         state.hasError = action.payload;
      });
   }
});

export default reviewSlice.reducer;