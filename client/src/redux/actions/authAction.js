import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const userLogin = createAsyncThunk(
   "auth/userLogin",
   async ({ email, password }, { rejectWithValue }) => {
      try {
         const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });

         if (window !== "undefined") {
            localStorage.setItem("jwt", JSON.stringify(response.data.userPayload))
         }
         return response?.data;
      } catch (err) {
         console.log(err)
         return rejectWithValue(err?.response?.data)
      }
   }
);

export const userSignup = createAsyncThunk(
   "auth/userSignup",
   async ({ firstName, lastName, email, password, confirmPassword }, { rejectWithValue }) => {
      try {
         const response = await axios.post(`${BASE_URL}/auth/signup`, {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
         });

         if (window !== "undefined") {
            localStorage.setItem("jwt", JSON.stringify(response.data.userPayload))
         }
         return response.data;
      } catch (err) {
         return rejectWithValue(err?.response?.data)
      }
   }
)


