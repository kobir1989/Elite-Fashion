import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import SubCategoryPage from "./pages/SubCategoryPage/SubCategoryPage";
const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sub-category/:id" element={<SubCategoryPage />} />
    </Routes>
  );
}

export default App;
