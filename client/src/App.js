import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import SubCategoryPage from './pages/SubCategoryPage/SubCategoryPage'
import SignupPage from './pages/SignupPage/SignupPage'
import LoginPage from './pages/LoginPage/LoginPage'
import ProductsPage from './pages/ProductsPage/ProductsPage'
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage'
import CartPage from './pages/CartPage/CartPage'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'
import UserProfilePage from './pages/UserProfilePage/UserProfilePage'
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage'
import ForgetPasswordPage from './pages/ForgetPasswordPage/ForgetPasswordPage'

const App = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/sub-category/:id' element={<SubCategoryPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/products/:id' element={<ProductsPage />} />
      <Route path='/product-details/:id' element={<ProductDetailsPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/cart' element={<CartPage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/user-profile/:id' element={<UserProfilePage />} />
      </Route>
      <Route path='/forget/password' element={<ForgetPasswordPage />} />
      <Route
        path='/reset/password/:resetToken'
        element={<ResetPasswordPage />}
      />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}

export default App
