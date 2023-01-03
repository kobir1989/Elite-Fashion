const CustomError = require("../helper/customError");
const { findOne } = require("../models/category.schema");
const Category = require("../models/category.schema");

//TODO: Still needs test here
module.exports.createCategory = async (req, res) => {
	const { name, imageUrl } = req.body;

	if (!name || !imageUrl) {
		throw new CustomError(400, "All the fields are mandatory");
	}
	const category = await Category.findOne({ name });
	if (category) {
		throw new CustomError(400, "Category Already Exists");
	}
	await category.create({
		name,
		imageUrl,
	});
	res.status(200).josn({ success: true, message: "New Category added" });
	console.log(err.message, "ERROR FROM CREATE CATEGORY CONTROLLER");
};

module.exports.editCategory = async (req, res) => {
	try {
		const { categoryId } = req.params;

		const isCategory = await Category.findById({ _id: categoryId });
		if (!isCategory) {
			throw new CustomError(400, "Category does not exists");
		}

		isCategory.name = req.body?.name;
		isCategory.imageUrl = req.body?.imageUrl;
		await isCategory.save();

		res.status(200).json({
			success: true,
			message: "Category updated successfully",
		});
	} catch (err) {
		res.status(err.code || 500).json({
			success: false,
			message: err.message,
		});
		console.log(err.message, "ERROR FROM EDIT CATEGORY CONTROLLER");
	}
};

module.exports.removeCategory = async (req, res) => {
	const { categoryId } = req.params;
	try {
		await Category.findByIdAndRemove({ _id: categoryId });
		res.status(200).json({
			success: true,
			message: "Category Removed Successfully",
		});
	} catch (err) {
		res.status(err.code || 500).json({
			success: false,
			message: err.message,
		});
		console.log(err.message, "ERROR FROM REMOVE CATEGORY CONTROLLER");
	}
};

module.exports.getAllCategories = async (_req, res) => {
	try {
		const allCategories = await Category.find();
		res.status(200).json({ success: true, allCategories });
	} catch (err) {
		res.status(err.code || 500).json({ success: false, message: err.message });
		console.log(err.message, "ERROR FROM GET-ALL CATEGORY CONTROLLER");
	}
};

module.exports.getSingleCategory = async (req, res) => {
	try {
		const { categoryId } = req.params;
		const singleCategory = await findOne({ _id: categoryId });
		res.status(200).json({ success: true, singleCategory });
	} catch (err) {
		res.status(err.code || 500).json({
			success: false,
			message: err.message,
		});
		console.log(err.message, "ERROR FROM GET-SINGLE CATEGORY CONTROLLER");
	}
};
