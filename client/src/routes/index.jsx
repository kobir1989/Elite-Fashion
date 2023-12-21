import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import ProtectedRoute from './ProtectedRoute'
import { Suspense, lazy } from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import PublicRoutes from './PublicRoutes'

// Lazy Loading Routes (Split the routes to make bundle size smaller)
const SubCategory = lazy(
  () => import('../pages/SubCategoryPage/SubCategoryPage')
)
const Login = lazy(() => import('../pages/LoginPage/LoginPage'))
const Signup = lazy(() => import('../pages/SignupPage/SignupPage'))
const ProductDetails = lazy(
  () => import('../pages/ProductDetailsPage/ProductDetailsPage')
)
const Products = lazy(() => import('../pages/ProductsPage/ProductsPage'))
const Cart = lazy(() => import('../pages/CartPage/CartPage'))
const UserProfile = lazy(
  () => import('../pages/UserProfilePage/UserProfilePage')
)
const ForgetPassword = lazy(
  () => import('../pages/ForgetPasswordPage/ForgetPasswordPage')
)
const Checkouts = lazy(() => import('../pages/CheckoutPage/CheckoutPage'))
const ResetPassword = lazy(
  () => import('../pages/ResetPasswordPage/ResetPasswordPage')
)

const LazyRoutes = () => {
  return (
    <Suspense fallback={<LinearProgress />}>
      <Routes>
        {/* These are Not Protected Routes All User can access these Routes. */}
        <Route path='/' element={<HomePage />} />
        <Route path='/sub-category/:id' element={<SubCategory />} />
        <Route path='/products/:id' element={<Products />} />
        <Route path='/product-details/:id' element={<ProductDetails />} />
        {/* Only Logged in user can access to these routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkouts />} />
          <Route path='/user-profile/:id' element={<UserProfile />} />
        </Route>
        {/* If user Logged in they can not access to these routes  */}
        <Route element={<PublicRoutes />}>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forget/password' element={<ForgetPassword />} />
          <Route
            path='/reset/password/:resetToken'
            element={<ResetPassword />}
          />
        </Route>
        {/* Catch All Routes */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Suspense>
  )
}

export default LazyRoutes
