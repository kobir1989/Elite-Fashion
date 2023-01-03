const route = require("express").Router();
const {
   getAllCategories,
   createCategory,
   editCategory,
   removeCategory,
   getSingleCategory
} = require("../controllers/category.controller");

const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");

route.get(
   "/categories/all",
   getAllCategories
);

route.get(
   "/categories/single/:categoryId",
   getSingleCategory
);

route.post(
   "/category/create/:userId",
   isAuthenticated,
   isAdmin,
   createCategory
);

route.put(
   "/category/edit/:userId/:categoryId",
   isAuthenticated,
   isAdmin,
   editCategory
);

route.delete(
   "/category/remove/:userId/:categoryId",
   isAuthenticated,
   isAdmin,
   removeCategory
);

module.exports = route;
