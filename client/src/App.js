import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import SubCategoryPage from "./pages/SubCategoryPage/SubCategoryPage";
import Signup from "./pages/Signup/Signup";
const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sub-category/:id" element={<SubCategoryPage />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
