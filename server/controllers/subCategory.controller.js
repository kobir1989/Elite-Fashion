const SubCategory = require('../models/subCategory.schema')
const CustomError = require('../helper/customError')
const catchAsync = require('../utils/catchAsync')
const ApiFeatures = require('../service/apiFeatures')

/********************************************************
 * @createSubCategory
 * @Route POST /api/v1/sub-category/create/:userId
 * @Description Create new sub-category. Only admin users are authorized to create sub-categories.
 * @Parameters {string} title - The name of the sub-category to be created.
 * @Parameters {string} category - The ID of the category to which the new sub-category belongs.
 * @Return success message.
 *********************************************************/
module.exports.createSubCategory = catchAsync(async (req, res) => {
  // Only ADMIN have access.
  if (req.user.role !== 'ADMIN') {
    throw new CustomError(
      'Access denied. You are not authorized to access this resource.',
      401
    )
  }

  const { title, category } = req.body
  if (!title || !category) {
    throw new CustomError('All fields are mandatory.', 400)
  }

  const newSubCategory = await SubCategory.create({
    name: title,
    image: req.image,
    imageId: req.imageId,
    category
  })

  return res.status(201).json({
    status: 'success',
    result: 1,
    data: {
      newSubCategory
    }
  })
})

/********************************************************
@editSubCategory
@route PUT /api/v1/sub-category/edit/:userId/:subCategoryId
@description Edit an existing sub-category. Only Admins are authorized to edit sub-categories.
@param {string} subCategoryId - The ID of the sub-category to edit.
@param {string} name - The new name for the sub-category.
@param {string} imageId - The ID of the new image for the sub-category.
@param {string} category - The ID of the category to which the sub-category belongs.
@returns {object} - A success message.
*********************************************************/
module.exports.editSubCategory = catchAsync(async (req, res) => {
  // Only ADMIN has access.
  if (req.user.role !== 'ADMIN') {
    throw new CustomError(
      'Access denied. You are not authorized to access this resource.',
      401
    )
  }

  const { subCategoryId } = req.params
  const { title, imageId, category } = req.body

  if (!title || !imageId || !category) {
    throw new CustomError('All the fields are mandatory', 400)
  }

  const updateSubCategory = await SubCategory.findByIdAndUpdate(
    {
      _id: subCategoryId
    },
    {
      name: title,
      imageId,
      image: req.image,
      category
    },
    {
      new: true,
      runValidators: true
    }
  )

  if (!updateSubCategory) {
    throw new CustomError('The requested sub-category does not exist.', 400)
  }

  return res.status(201).json({
    status: 'success',
    result: 1,
    data: {
      updateSubCategory
    }
  })
})

/*****************************************************************************
 * @description Remove existing sub-category. Only Admins are authorized to remove.
 * @route DELETE /api/v1/sub-category/remove/:subCategoryId:categoryId
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The success message
 ******************************************************************************/
module.exports.removeSubCategory = catchAsync(async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    throw new CustomError(
      'Access denied. You are not authorized to access this resource.',
      401
    )
  }

  const { subCategoryId } = req.params
  const deleteSubCategory = await SubCategory.findByIdAndRemove({
    _id: subCategoryId
  })

  if (!deleteSubCategory) {
    throw new CustomError('Requested sub-category does not exist.', 400)
  }

  return res.status(201).json({
    status: 'success',
    result: 1,
    data: {
      deleteSubCategory
    }
  })
})

/***************************************************************
 * @description Retrieve single sub-category by ID.
 * @route GET /api/v1/sub-category/single/:subCategoryId
 * @returns {Object} The single sub-category object
 ****************************************************************/
module.exports.getSingleSubCategory = catchAsync(async (req, res) => {
  const { subCategoryId } = req.params
  const singleSubCategory = await SubCategory.findOne({
    _id: subCategoryId
  }).exec()

  return res.status(200).json({
    status: 'success',
    result: 1,
    data: {
      singleSubCategory
    }
  })
})

/********************************************************************************
 * @description Retrieve all sub-categories related to a category.
 * @route GET /api/v1/sub-category/:categoryId
 * @returns {Array} The sub-category array
 ******************************************************************************/
module.exports.getAllRelatedSubCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params
  const subCategories = await SubCategory.find({ category: categoryId })
  return res.status(200).json({
    status: 'success',
    result: subCategories.length,
    data: {
      subCategories
    }
  })
})

/*****************************************************************************
 * @description Retrieve all sub-categories.
 * @route GET /api/v1/sub-categories/all
 * @returns {Array} The sub-category array
 ***************************************************************************/
module.exports.getAllSubCategory = catchAsync(async (req, res) => {
  const subCtgApiFeatures = new ApiFeatures(
    req.query,
    SubCategory.find(),
    SubCategory
  )
    .filter()
    .limitFields()
    .populate('category', 'name _id')

  const paginate = await subCtgApiFeatures.paginate()
  const subCategories = await subCtgApiFeatures.query

  return res.status(200).json({
    status: 'success',
    result: subCategories.length,
    ...paginate,
    data: {
      subCategories
    }
  })
})
