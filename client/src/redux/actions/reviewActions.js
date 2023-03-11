import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosBaseUrl } from "../../utils/axios.config";

//Fetch All reviews
export const fetchReviews = createAsyncThunk("review/fetchReviews",
   async (id, { getState, rejectWithValue }) => {
      const state = getState()
      try {
         const response = await axiosBaseUrl.get(`/reviews/all/${id}`,
            {
               headers: {
                  "Content-Type": " application/x-www-form-urlencoded",
                  "Authorization": `Bearer ${state.auth.token}`
               }
            }
         )
         return response?.data?.reviews;
      } catch (error) {
         return rejectWithValue(error);
      }

   });

//Create new Review
export const createReview = createAsyncThunk(
   "review/createReview",
   async ({ comment, rating, id }, { getState, rejectWithValue }) => {
      console.log(comment, rating)
      const state = getState();
      try {
         const response = await axiosBaseUrl.post(`/review/create`, {
            comment,
            rating,
            id
         }, {
            headers: {
               'Content-Type': "application/x-www-form-urlencoded",
               "Authorization": `Bearer ${state.auth.token}`
            }
         });
         // console.log(response);
         return response?.data;
      } catch (err) {
         return rejectWithValue(err?.response?.data);
      }
   }
)