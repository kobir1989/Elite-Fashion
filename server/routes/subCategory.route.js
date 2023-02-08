const route = require("express").Router();
const { isAuthenticated } = require("../middlewares/authMiddleware");
const {
   createSubCategory,
   editSubCategory,
   removeSubCategory,
   getSingleSubCategory,
   getAllRelatedSubCategory,
   getAllSubCategory
} = require("../controllers/subCategory.controller");
const { fileUploader, updateFile } = require("../middlewares/imgUpload.middleware")

route.get(
   "/sub-category/:categoryId",
   getAllRelatedSubCategory
);

route.get(
   "/sub-category/list/all",
   getAllSubCategory
);

route.get(
   "/sub-category/single/:subCategoryId",
   getSingleSubCategory
);

route.post(
   "/sub-category/create/new",
   isAuthenticated,
   fileUploader,
   createSubCategory
);

route.put(
   "/sub-category/edit/:subCategoryId",
   isAuthenticated,
   updateFile,
   editSubCategory,
);

route.delete(
   "/sub-category/remove/:subCategoryId",
   isAuthenticated,
   updateFile,
   removeSubCategory
);

module.exports = route;