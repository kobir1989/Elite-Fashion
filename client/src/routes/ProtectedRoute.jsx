import { Outlet, Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { isAuth } from '../helpers/isAuth.helper'

const ProtectedRoute = () => {
  if (!isAuth()) {
    toast.dismiss()
    toast.error('You are not authorized. Please login to continue')
    return <Navigate to='/login' />
  } else {
    return <Outlet />
  }
}
export default ProtectedRoute
