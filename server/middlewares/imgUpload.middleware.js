const cloudinary = require('cloudinary').v2
const config = require('../config/index')
const CustomError = require('../helper/customError')
const catchAsync = require('../utils/catchAsync')

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_API_KEY,
  api_secret: config.CLOUD_SECRET
})

/******************************************************************************
 * Middleware for file upload
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The callback function to move to the next middleware
 * @throws {CustomError} Throws an error if image upload fails
 ******************************************************************************/
module.exports.fileUploader = catchAsync(async (req, res, next) => {
  //This middleware also used to upload user profile pic.

  if (req.files) {
    const file = req.files.image
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'products'
    })

    req.image = result.secure_url
    req.imageId = result.public_id

    if (!req.image && !req.imageId) {
      throw new CustomError(400, 'Image upload failed!')
    }

    if (req.image) {
      return next()
    }
  } else {
    next()
  }
})

/********************************************************************************
 * Middleware for file update
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The callback function to move to the next middleware
 * @throws {CustomError} Throws an error if image upload fails
 ******************************************************************************/
module.exports.updateFile = catchAsync(async (req, res, next) => {
  const { imageId } = req.body

  // Only execute this condition if it's a DELETE request.
  if (req.method === 'DELETE') {
    await cloudinary.uploader.destroy(imageId)
    return next()
  }

  // If req has imageId and req.files is null, that means user only wants to update product details,
  // in that case this middleware won't do anything just next() will trigger.
  if (!req.files && imageId) {
    return next()
  }

  if (imageId) {
    await cloudinary.uploader.destroy(imageId)
  }

  const file = req.files.image

  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: 'products'
  })

  req.image = result.secure_url
  req.imageId = result.public_id

  if (!req.image && !req.imageId) {
    throw new CustomError(400, 'Image upload failed!')
  }

  if (req.image) {
    return next()
  }
})
