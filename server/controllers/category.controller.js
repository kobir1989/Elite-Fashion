const CustomError = require("../helper/customError");
const Category = require("../models/category.schema");

/********************************************************
 * @createCategory
 * @Route POST http://localhost:5000/api/v1/category/create/:userId,
 * @Description Create new Category, Only Admin are Authorized to create Category
 * @Parameters name, imageUrl
 * @Return success message
 *********************************************************/
module.exports.createCategory = async (req, res) => {
	try {
		const { name, imageUrl } = req.body;

		if (!name || !imageUrl) {
			throw new CustomError(400, "All the fields are mandatory");
		}
		const category = await Category.findOne({ name }).exec();
		if (category) {
			throw new CustomError(400, "Category Already Exists");
		}
		await Category.create({
			name,
			imageUrl,
		});
		return res.status(200).json({
			success: true,
			message: "New Category added"
		});

	} catch (err) {
		console.log(err.message, "ERROR FROM CREATE CATEGORY CONTROLLER");
		return res.status(err.code || 500).json({
			success: false,
			message: err?.message || "Something went wrong"
		})
	}
};

/********************************************************
 * @editCategory
 * @Route PUT http://localhost:5000/api/v1/category/sub-category/edit/:userId/:subCategoryId,
 * @Description Edit existing Sub-Category, Only Admin are Authorized to Edit.
 * @Parameters categoryId, name, imageUrl 
 * @Return success message
 *********************************************************/
module.exports.editCategory = async (req, res) => {
	try {
		const { categoryId } = req.params;
		const { name, imageUrl } = req.body;

		if (!name || !imageUrl) {
			throw new CustomError(400, "All the fields are mandatory")
		};

		const updateCategory = await Category.findByIdAndUpdate(
			{
				_id: categoryId
			},
			{
				name, imageUrl
			},
			{
				new: true,
				runValidators: true
			});

		if (!updateCategory) {
			throw new CustomError(400, "Category does not exists");
		}

		return res.status(200).json({
			success: true,
			message: "Category updated successfully",
		});

	} catch (err) {
		console.log(err.message, "ERROR FROM EDIT CATEGORY CONTROLLER");
		return res.status(err.code || 500).json({
			success: false,
			message: err.message,
		});
	}
};

/********************************************************
 * @removeCategory
 * @Route DELETE http://localhost:5000/api/v1/category/remove/:userId/:categoryId
 * @Description Remove existing Category, Only Admin are Authorized to Remove Category
 * @Parameters categoryId
 * @Return success message
 *********************************************************/
module.exports.removeCategory = async (req, res) => {
	try {
		const { categoryId } = req.params;
		await Category.findByIdAndRemove({ _id: categoryId });
		return res.status(200).json({
			success: true,
			message: "Category Removed Successfully",
		});
	} catch (err) {
		console.log(err.message, "ERROR FROM REMOVE CATEGORY CONTROLLER");
		return res.status(err.code || 500).json({
			success: false,
			message: err.message,
		});
	}
};

/********************************************************
 * @getAllCategories
 * @Route GET http://localhost:5000/api/v1/categories/all
 * @Description  Retrieve all categories, and then sends the resulting data back to the client as a JSON response.
 * @Parameters none
 * @Return category Array
 *********************************************************/
module.exports.getAllCategories = async (_req, res) => {
	try {
		const allCategories = await Category.find();
		return res.status(200).json({ success: true, allCategories });
	} catch (err) {
		console.log(err.message, "ERROR FROM GET-ALL CATEGORY CONTROLLER");
		return res.status(err.code || 500).json({
			success: false,
			message: err.message
		});

	}
};

/********************************************************
 * @getSingleCategory
 * @Route GET http://localhost:5000/api/v1/category/single/:categoryId
 * @Description Retrieve single category, and then sends the resulting data back to the client as a JSON response.
 * @Parameters categoryId
 * @Return single category Object
 *********************************************************/
module.exports.getSingleCategory = async (req, res) => {
	try {
		const { categoryId } = req.params;
		const singleCategory = await Category.findById(
			{
				_id: categoryId
			});

		return res.status(200).json({ success: true, singleCategory });

	} catch (err) {
		console.log(err.message, "ERROR FROM GET-SINGLE CATEGORY CONTROLLER");
		return res.status(err.code || 500).json({
			success: false,
			message: err.message,
		});

	}
};
