const CustomError = require('../helper/customError')
const Product = require('../models/product.schema')
const catchAsync = require('../utils/catchAsync')

/**
 * Middleware to update product stock quantity and sold quantity after an order is placed.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
module.exports.updateStock = catchAsync((req, _res, next) => {
  const { checkout } = req.body

  const updateOperations = checkout.order.map(product => {
    return {
      updateOne: {
        filter: { _id: product._id },
        update: {
          $inc: { stock: -product.quantity, sold: +product.quantity }
        }
      }
    }
  })
  Product.bulkWrite(updateOperations, (err, _products) => {
    if (err) {
      throw new CustomError(
        'Bulk operation failed',
        'Update stock middleware',
        400
      )
    }
    next()
  })
})
