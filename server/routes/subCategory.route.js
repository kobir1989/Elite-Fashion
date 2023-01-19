const route = require("express").Router();
const { isAuthenticated } = require("../middlewares/authMiddleware");
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
   fileUploader,
   createSubCategory
);

route.put(
   "/sub-category/edit/:userId/:subCategoryId",
   isAuthenticated,
   editSubCategory,
);

route.delete(
   "/sub-category/remove/:userId/:subCategoryId",
   isAuthenticated,
   removeSubCategory
);

module.exports = route;