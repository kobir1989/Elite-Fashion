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
      if (req.role !== "ADMIN") {
         throw new CustomError(401, "Access denied. You are not authorized to access this resource.");
      };
      const { name, categoryId } = req.body;
      if (!name || !categoryId) {
         throw new CustomError(400, "All the fields are mandatory");
      };

      const isSubCategory = await SubCategory.findOne({ name }).exec();
      if (isSubCategory) {
         throw new CustomError(400, "Sub-Category already exists")
      }

      await SubCategory.create({
         name,
         image: req.imageUrl,
         category: categoryId
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
//TODO: TEST this: There is issue fix it
module.exports.editSubCategory = async (req, res) => {
   try {
      //only ADMIN has access.
      if (req.role !== "ADMIN") {
         throw new CustomError(401, "Access denied. You are not authorized to access this resource.", "");
      };
      const { subCategoryId } = req.params;
      const { name, image, categoryId } = req.body;
      console.log(name, image, categoryId)

      if (!name || !image || !categoryId) {
         throw new CustomError(400, "All the fields are mandatory", "Edit validatin")
      }

      const updateSubCategory = await SubCategory.findByIdAndUpdate(
         {
            _id: subCategoryId
         },
         {
            name, imageUrl: image, category: categoryId
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
      if (req.role !== "ADMIN") {
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
 * @getAllCategories
 * @Route GET http://localhost:5000/api/v1/sub-categories/all
 * @Description  Retrieve all Sub-Categories, and then sends the resulting data back to the client as a JSON response.
 * @Parameters none
 * @Return category Array
 *********************************************************/
module.exports.getAllSubCategory = async (req, res) => {
   try {
      const { categoryId } = req.params;
      const subCategories = await SubCategory.find({ "category": categoryId });
      return res.status(200).json({ success: true, subCategories });

   } catch (err) {
      errorResponse(res, err, "GET-ALL-SUB-CATEGORY");
   };
};