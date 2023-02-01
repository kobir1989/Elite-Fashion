const route = require("express").Router();
const { isAuthenticated } = require("../middlewares/authMiddleware");
const { fileUploader } = require("../middlewares/imgUpload.middleware")
const {
   getProductsByLimits,
   getSingleProducts,
   deleteProduct,
   editProduct,
   createNewProduct,
   getBestSellingProducts,
   getStockOutPoducts,
   getAllProducts
} = require("../controllers/product.controller")

route.get("/:subCategoryId/products", getProductsByLimits);
route.get("/product/single/:productId", getSingleProducts);
route.get("/product/best-selling", getBestSellingProducts);
route.get("/product/stock-out", isAuthenticated, getStockOutPoducts);
route.get("/products/all", isAuthenticated, getAllProducts);

route.post(
   "/create/product/:userId",
   isAuthenticated,
   fileUploader,
   createNewProduct
);

route.put(
   "/product/edit/:userId/:productId",
   isAuthenticated,
   editProduct
);

route.delete(
   "/product/delete/:userId/:productId",
   isAuthenticated,
   deleteProduct
);


module.exports = route