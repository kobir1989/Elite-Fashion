const route = require("express").Router();
const { isAdmin, isAuthenticated } = require("../middlewares/authMiddleware");
const {
   createSubCategory,
   editSubCategory,
   removeSubCategory,
   getSingleSubCategory,
   getAllSubCategory
} = require("../controllers/subCategory.controller");
const { fileUploader } = require("../middlewares/imgUpload.middleware")

route.get(
   "/sub-category/:categoryId",
   getAllSubCategory
);

route.get(
   "/sub-category/single/:subCategoryId",
   getSingleSubCategory
);

route.post(
   "/sub-category/create/:userId",
   isAuthenticated,
   isAdmin,
   fileUploader,
   createSubCategory
);

route.put(
   "/sub-category/edit/:userId/:subCategoryId",
   isAuthenticated,
   isAdmin,
   editSubCategory,
);

route.delete(
   "/sub-category/remove/:userId/:subCategoryId",
   isAuthenticated,
   isAdmin,
   removeSubCategory
);

module.exports = route;