const SubCategory = require("../models/subCategory.schema");
const CustomError = require("../helper/customError");

module.exports.createSubCategory = async (req, res) => {
   try {
      const { name, imageUrl, categoryId } = req.body;
      if (!name || !imageUrl || !categoryId) {
         throw new CustomError(400, "All the fields are mandatory");
      };

      const isSubCategory = await SubCategory.findOne({ name }).exec();
      if (isSubCategory) {
         throw new CustomError(400, "Sub-Category already exists")
      }

      await SubCategory.create({
         name,
         imageUrl,
         category: categoryId
      });

      return res.status(200).json({
         success: true,
         message: "New Sub-Category Added"
      });

   } catch (err) {
      console.log(err.message, "ERROR FROM SUB-CATEGORY (CREATE) CONTROLLER");
      return res.status(err.code || 500).json({
         success: false,
         message: err.message
      });
   };
};

module.exports.editSubCategory = async (req, res) => {
   try {
      const { subCategoryId } = req.params;
      const { name, imageUrl, categoryId } = req.bdoy;

      if (!name || !imageUrl || !categoryId) {
         throw new CustomError(400, "All the fields are mandatory")
      }

      const updateSubCategory = await SubCategory.findByIdAndUpdate(
         {
            _id: subCategoryId
         },
         {
            name, imageUrl, categoryId
         },
         {
            new: true,
            runValidators: true
         }
      );

      if (!updateSubCategory) {
         throw new CustomError(400, "Requested Sub-Category does not exists")
      };

      res.status(200).json({
         success: true,
         message: "Sub-Category updated successfully"
      });

   } catch (err) {
      console.log(err.message, "ERROR FROM SUB-CATEGORY (EDIT) CONTROLLER");
      return res.status(err.code || 500).json({
         success: false,
         message: err.message
      });
   };
};

module.exports.removeSubCategory = async (req, res) => {
   try {
      const { subCategoryId } = req.params;

      const deleteSubCategory = await SubCategory.findByIdAndRemove({
         _id: subCategoryId
      });

      if (!deleteSubCategory) {
         throw new CustomError(400, "Requested Sub-Category does not exists")
      }
      res.status(200).json({
         success: true,
         message: "Sub-Category Removed Successfully"
      });

   } catch (err) {
      console.log(err.message, "ERROR FROM SUB-CATEGORY (REMOVE) CONTROLLER");
      return res.status(err.code || 500).json({
         success: false,
         message: err.message
      });
   };
};

module.exports.getSingleSubCategory = async (req, res) => {
   try {
      const { subCategoryId } = req.params;
      const singleSubCategory = await SubCategory.findOne({
         _id: subCategoryId
      });

      res.status(200).json({ success: true, singleSubCategory });

   } catch (err) {
      console.log(err.message, "ERROR FROM SUB-CATEGORY (REMOVE) CONTROLLER");
      return res.status(err.code || 500).json({
         success: false,
         message: err.message
      });
   };
};

module.exports.getAllSubCategory = async (_req, res) => {
   try {
      const subCategories = await SubCategory.find();
      return res.status(200).json({ success: true, subCategories })

   } catch (err) {
      console.log(err.message, "ERROR FROM SUB-CATEGORY (GET ALL) CONTROLLER");
      return res.status(err.code || 500).json({
         success: false,
         message: err.message
      });
   };
};