const route = require("express").Router();
const {
   getAllCategories,
   createCategory,
   editCategory,
   removeCategory,
   getSingleCategory
} = require("../controllers/category.controller");

const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");
const { fileUploader } = require("../middlewares/imgUpload.middleware");

route.get(
   "/categories/all",
   getAllCategories
);

route.get(
   "/category/single/:categoryId",
   getSingleCategory
);

route.post(
   "/category/create/:userId",
   isAuthenticated,
   isAdmin,
   fileUploader,
   createCategory
);

route.put(
   "/category/edit/:userId/:categoryId",
   isAuthenticated,
   isAdmin,
   fileUploader,
   editCategory
);

route.delete(
   "/category/remove/:userId/:categoryId",
   isAuthenticated,
   isAdmin,
   removeCategory
);

module.exports = route;
