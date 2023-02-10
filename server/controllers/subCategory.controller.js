const SubCategory = require("../models/subCategory.schema");
const CustomError = require("../helper/customError");
const errorResponse = require("../helper/errorResponse");

/********************************************************
 * @getSingleCategory
 * @Route GET http://localhost:5000/api/v1/sub-category/create/:userId
 * @Description Create new Sub-Category, Only Admin are Authorized to create Category
 * @Parameters name, imageUrl, categoryId 
 * @Return success message
 *********************************************************/
module.exports.createSubCategory = async (req, res) => {
   try {
      //only ADMIN has access.
      if (req.user.role !== "ADMIN") {
         throw new CustomError(401, "Access denied. You are not authorized to access this resource.");
      };
      const { title, category } = req.body;
      if (!title || !category) {
         throw new CustomError(400, "All the fields are mandatory");
      };
      await SubCategory.create({
         name: title,
         image: req.image,
         imageId: req.imageId,
         category
      });

      return res.status(200).json({
         success: true,
         message: "New Sub-Category Added"
      });

   } catch (err) {
      errorResponse(res, err, "CREATE-SUB-CATEGORY");
   };
};

/********************************************************
 * @editCategory
 * @Route PUT http://localhost:5000/api/v1/category/edit/:userId/:categoryId,
 * @Description Edit existing Category, Only Admin are Authorized to Edit Category
 * @Parameters subCategoryId, name, imageUrl, categoryId 
 * @Return success message
 *********************************************************/
module.exports.editSubCategory = async (req, res) => {
   try {
      //only ADMIN has access.
      if (req.user.role !== "ADMIN") {
         throw new CustomError(401, "Access denied. You are not authorized to access this resource.", "");
      };
      const { subCategoryId } = req.params;
      const { title, imageId, category } = req.body;

      if (!title || !imageId || !category) {
         throw new CustomError(400, "All the fields are mandatory", "Edit validatin")
      }

      const updateSubCategory = await SubCategory.findByIdAndUpdate(
         {
            _id: subCategoryId
         },
         {
            name: title, imageId, image: req.image, category
         },
         {
            new: true,
            runValidators: true
         }
      );

      if (!updateSubCategory) {
         throw new CustomError(400, "Requested Sub-Category does not exists")
      };

      return res.status(200).json({
         success: true,
         message: "Sub-Category updated successfully"
      });

   } catch (err) {
      errorResponse(res, err, "EDIT-SUB-CATEGORY");
   };
};

/********************************************************
 * @removeCategory
 * @Route DELETE http://localhost:5000/api/v1/sub-category/remove/:userId/:subCategoryId:categoryId
 * @Description Remove existing Sub-Category, Only Admin are Authorized to Remove.
 * @Parameters subCategoryId
 * @Return success message
 *********************************************************/
module.exports.removeSubCategory = async (req, res) => {
   try {
      //only ADMIN has access.
      if (req.user.role !== "ADMIN") {
         throw new CustomError(401, "Access denied. You are not authorized to access this resource.");
      };
      const { subCategoryId } = req.params;

      const deleteSubCategory = await SubCategory.findByIdAndRemove({
         _id: subCategoryId
      });

      if (!deleteSubCategory) {
         throw new CustomError(400, "Requested Sub-Category does not exists")
      }
      return res.status(200).json({
         success: true,
         message: "Sub-Category Removed Successfully"
      });

   } catch (err) {
      errorResponse(res, err, "DELETE-SUB-CATEGORY");
   };
};

/********************************************************
 * @getSingleCategory
 * @Route GET http://localhost:5000/api/v1/sub-category/single/:subCategoryId
 * @Description Retrieve single sub-category, and then sends the resulting data back to the client as a JSON response.
 * @Parameters subCategoryId
 * @Return single sub-category Object
 *********************************************************/
module.exports.getSingleSubCategory = async (req, res) => {
   try {
      const { subCategoryId } = req.params;
      const singleSubCategory = await SubCategory.findOne({
         _id: subCategoryId
      }).exec();

      return res.status(200).json({ success: true, singleSubCategory });

   } catch (err) {
      errorResponse(res, err, "GET-SINGLE-SUB-CATEGORY");
   };
};

/********************************************************
 * @getAllRelatedSubCategory
 * @Route GET http://localhost:5000/api/v1/sub-category/:categoryId
 * @Description  Retrieve all Sub-Categories based on category Id, and then sends the resulting data back to the client as a JSON response.
 * @Parameters none
 * @Return category Array
 *********************************************************/
module.exports.getAllRelatedSubCategory = async (req, res) => {
   try {
      const { categoryId } = req.params;
      const subCategories = await SubCategory.find({ "category": categoryId });
      return res.status(200).json({ success: true, subCategories });

   } catch (err) {
      errorResponse(res, err, "GET-RELATED-SUB-CATEGORY");
   };
};

/********************************************************
 * @getAllCategories
 * @Route GET http://localhost:5000/api/v1/sub-categories/all
 * @Description  Retrieve all Sub-Categories, and then sends the resulting data back to the client as a JSON response.
 * @Parameters none
 * @Return category Array
 *********************************************************/
module.exports.getAllSubCategory = async (req, res) => {
   try {
      const subCategories = await SubCategory.find().populate("category", "name _id");
      return res.status(200).json({ success: true, subCategories });
   } catch (err) {
      console.log(err)
      errorResponse(res, err, "GET-ALL-SUB-CATEGORY");
   };
};

/********************************************************
 * @getPaginatedSubCategory
 * @Route GET http://localhost:5000/api/v1/:categoryId/sub-category?page=1&limit=12
 * @Description  Retrieve all Sub-Categories based page and limits from related category Id, and then sends the resulting data back to the client as a JSON response.
 * @Parameters  page, limit from req.query and categoryId from req.params
 * @Return category Array
 *********************************************************/
module.exports.getSubCategoryByLimits = async (req, res) => {
   try {
      const { page, limit } = req.query;
      const { categoryId } = req.params;
      const startsIndexAt = (page - 1) * limit;
      const endsIndexAt = page * limit;
      const subCategory = {};
      if (!page || !limit || !categoryId) {
         throw new CustomError(400, "Page and Sub-category Limits are required")
      }
      subCategory.result = await SubCategory.find({ "category": categoryId })
         .limit(limit)
         .skip(startsIndexAt)
         .exec();

      if (subCategory.result.length) {
         subCategory.totalPage = Math.trunc(await SubCategory.find({ "category": categoryId }).countDocuments().exec() / parseInt(limit));
         if (endsIndexAt < subCategory.result.length) {
            subCategory.next = {
               page: parseInt(page) + 1,
               limit: limit
            }
         };

         if (startsIndexAt > 0) {
            subCategory.previous = {
               page: page - 1,
               limit: limit
            }
         };
      }
      return res.status(200).json({ success: true, subCategory })

   } catch (err) {
      errorResponse(res, err, "PAGINATED-SUB-CATEGORY");
   };
};
