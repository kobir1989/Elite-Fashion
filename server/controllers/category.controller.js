const CustomError = require("../helper/customError");
const Category = require("../models/category.schema");

module.exports.getAllCategories = async (_req, res) => {
   try {
      const allCategories = await Category.find();
      res.status(200).json({ success: true, allCategories });
   } catch (err) {
      res.status(err.code || 500).json({ success: false, message: err.message });
   }
};
