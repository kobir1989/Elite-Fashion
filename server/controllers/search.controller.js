const Product = require('../models/product.schema')
const CustomError = require('../helper/customError')
const catchAsync = require('../utils/catchAsync')

/********************************************************
 * @searchController
 * @route GET /api/v1/search/:key
 * @description Searches for products in the database with a title that matches the search key passed in the request. The search is case-insensitive, and the controller returns at most 5 matching products sorted by title in ascending order.
 * @param {string} key - The search key.
 * @returns {Array} - Array of matching products.
 *********************************************************/
module.exports.searchController = catchAsync(async (req, res) => {
  const { key } = req.params

  if (!key) {
    throw new CustomError('Invalid search key provided.', 400)
  }

  const result = await Product.find({
    $or: [
      {
        title: { $regex: key, $options: 'i' }
      }
    ]
  })
    .sort({ title: 1 })
    .limit(4)

  res.status(200).json({
    status: 'success',
    results: result.length,
    data: {
      result
    }
  })
})
