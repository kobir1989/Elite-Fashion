const route = require("express").Router();
const { isAuthenticated } = require("../middlewares/authMiddleware");
const { fileUploader, updateFile } = require("../middlewares/imgUpload.middleware");
const {
   getProductsByLimits,
   getSingleProducts,
   deleteProduct,
   editProduct,
   createNewProduct,
   getBestSellingProducts,
   getAllProducts,
} = require("../controllers/product.controller")

route.get("/:subCategoryId/products", getProductsByLimits);
route.get("/product/single/:productId", getSingleProducts);
route.get("/product/best-selling", getBestSellingProducts);
route.get("/products/all", isAuthenticated, getAllProducts);

route.post(
   "/create/product",
   isAuthenticated,
   fileUploader,
   createNewProduct
);

route.put(
   "/product/edit/:productId",
   isAuthenticated,
   updateFile,
   editProduct
);

route.delete(
   "/product/delete/:productId",
   isAuthenticated,
   deleteProduct
);


module.exports = route