const route = require("express").Router();
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");
const { fileUploader } = require("../middlewares/imgUpload.middleware")
const {
   getAllProducts,
   deleteProduct,
   editProduct,
   createNewProduct
} = require("../controllers/product.controller")

route.get("/:subCategoryId/products", getAllProducts);

route.post(
   "/create/product/:userId",
   isAuthenticated,
   isAdmin,
   fileUploader,
   createNewProduct
);

route.put(
   "/product/edit/:userId/:productId",
   isAuthenticated,
   isAdmin,
   editProduct
);

route.delete(
   "/product/delete/:userId/:productId",
   isAuthenticated,
   isAdmin,
   deleteProduct
);


module.exports = route