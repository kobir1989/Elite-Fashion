import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { logout } from "../../redux/features/authSlice";
import toast from "react-hot-toast";

export const ProtectedRoute = ({ children, ...otherProps }) => {
   const { token } = useSelector(state => state.auth);
   const location = useLocation()
   const dispatch = useDispatch()

   if (!token) {
      toast.dismiss()
      toast.error("You are not authorized. Please login to continue")
      return <Navigate to="/login" state={{ from: location }} />
   }
   try {
      const decodedToken = jwt_decode(token);
      // console.log(decodedToken, "DECODE")
      // check token expiration date
      const expirationDate = new Date(decodedToken.exp * 1000);
      console.log(expirationDate, "EXPIRE")
      if (expirationDate < new Date()) {
         toast.dismiss()
         toast.error("Your session has expired. Please login again.")
         return <Navigate to="/login" state={{ from: location }} />
      }
   } catch (err) {
      dispatch(logout())
   }
   return <>
      <Outlet />
      {children}
   </>
};

