const CustomError = require("../helper/customError");
const Category = require("../models/category.schema");
const errorResponse = require("../helper/errorResponse");

/********************************************************
 * @createCategory
 * @Route POST http://localhost:5000/api/v1/category/create/:userId,
 * @Description Create new Category, Only Admin are Authorized to create Category
 * @Parameters name, imageUrl
 * @Return success message
 *********************************************************/
module.exports.createCategory = async (req, res) => {
	try {
		//only ADMIN has access.
		if (req.user.role !== "ADMIN") {
			throw new CustomError(401, "Access denied. You are not authorized to access this resource.");
		};

		const { name } = req.body;

		if (!name) {
			throw new CustomError(400, "All the fields are mandatory");
		}
		const category = await Category.findOne({ name }).exec();
		if (category) {
			throw new CustomError(400, "Category Already Exists");
		}
		await Category.create({
			name,
			image: req.imageUrl,
		});
		return res.status(200).json({
			success: true,
			message: "New Category added"
		});

	} catch (err) {
		errorResponse(res, err, "CREATE-CATEGORY");
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
		//only ADMIN has access.
		if (req.user.role !== "ADMIN") {
			throw new CustomError(401, "Access denied. You are not authorized to access this resource.");
		};
		const { categoryId } = req.params;
		const { name } = req.body;
		if (!name) {
			throw new CustomError(400, "All the fields are mandatory")
		};

		const updateCategory = await Category.findByIdAndUpdate(
			{
				_id: categoryId
			},
			{
				name, image: imageUrl
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
		errorResponse(res, err, " EDIT-CATEGORY ");
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
		//only ADMIN has access.
		if (req.user.role !== "ADMIN") {
			throw new CustomError(401, "Access denied. You are not authorized to access this resource.");
		};
		const { categoryId } = req.params;
		await Category.findByIdAndRemove({ _id: categoryId });
		return res.status(200).json({
			success: true,
			message: "Category Removed Successfully",
		});
	} catch (err) {
		errorResponse(res, err, "REMOVE-CATEGORY")
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
		errorResponse(res, err, "GET-ALL CATEGORY");
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
		errorResponse(res, err, "GET-SINGLE CATEGORY")
	}
};
