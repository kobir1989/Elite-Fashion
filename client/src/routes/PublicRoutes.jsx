import { Navigate, Outlet } from 'react-router-dom'
import { isAuth } from '../helpers/isAuth.helper'

const PublicRoutes = () => {
  return <>{!isAuth() ? <Outlet /> : <Navigate to='/' />}</>
}

export default PublicRoutes
