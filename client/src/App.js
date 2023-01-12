import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import SubCategoryPage from "./pages/SubCategoryPage/SubCategoryPage";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import axios from "axios";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
const App = () => {
  axios.defaults.withCredentials = true;
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sub-category/:id" element={<SubCategoryPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products/:id" element={<Products />} />
      <Route path="/product-details/:id" element={<ProductDetails />} />
    </Routes>
  );
}

export default App;
