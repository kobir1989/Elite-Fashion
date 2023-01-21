const route = require("express").Router();
const { isAuthenticated } = require("../middlewares/authMiddleware");
const { fileUploader } = require("../middlewares/imgUpload.middleware")
const {
   getAllProducts,
   getSingleProducts,
   deleteProduct,
   editProduct,
   createNewProduct
} = require("../controllers/product.controller")

route.get("/:subCategoryId/products", getAllProducts);
route.get("/product/single/:productId", getSingleProducts);

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