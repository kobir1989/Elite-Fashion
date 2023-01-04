const route = require("express").Router();
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware")
const {
   getAllProducts,
   deleteProduct,
   editProduct,
   createNewProduct
} = require("../controllers/product.controller")

route.get("/products/all", getAllProducts);

route.post(
   "/create/product/:userId",
   isAuthenticated,
   isAdmin,
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