import React from 'react';
import { useSelector } from "react-redux";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { isAuth } from '../../helpers/isAuth.helper';

export const ProtectedRoute = ({ role, children, ...otherProps }) => {
   const { userInfo } = useSelector(state => state.auth);
   // const isLoggedIn = isAuth(userInfo)
   const location = useLocation();
   if (userInfo?.role !== role) {
      return <Navigate to="/login" state={{ from: location }} />
   }
   return <Outlet />
};
