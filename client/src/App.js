import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SubCategoryPage from "./pages/SubCategoryPage/SubCategoryPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import axios from "axios";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
const App = () => {
  axios.defaults.withCredentials = true;
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sub-category/:id" element={<SubCategoryPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/products/:id" element={<ProductsPage />} />
      <Route path="/product-details/:id" element={<ProductDetailsPage />} />
      <Route element={<ProtectedRoute role={"USER"} />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Route>
    </Routes>
  );
}

export default App;
