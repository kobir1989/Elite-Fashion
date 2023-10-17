const Review = require('../models/review.schema')
const CustomError = require('../helper/customError')
const catchAsync = require('../utils/catchAsync')
const ApiFeatures = require('../service/apiFeatures')

/*************************************************************************
 * Get all the reviews and ratings for a specific product based on the product id.
 * @name getSingleProductReviews
 * @route GET /reviews/product/:productId
 * @returns {Object} Returns a JSON object with the following properties:
 * - success (boolean): Whether the request was successful.
 * - reviews (Array): An array of all the reviews in the database based on the product id.
 * @throws {CustomError} If there's an error fetching the data from the database.
 *****************************************************************************/
module.exports.getSingleProductReviews = catchAsync(async (req, res) => {
  const { productId } = req.params
  const reviews = await Review.find({ product: productId }).populate(
    'user',
    'image name'
  )
  res.status(200).json({ success: true, reviews })
})

/********************************************************************
 * Create a new review. Only authorized users and admins have access.
 * @name createReview
 * @route POST api/v1/review/create
 * @param {string} req.body.comment - The comment for the review.
 * @param {number} req.body.rating - The rating for the review.
 * @param {Object} req.user - The authenticated user object.
 * @param {string} req.user.id - The user ID of the authenticated user.
 * @returns {Object} Returns a JSON object with the following properties:
 * - success (boolean): Whether the review was successfully created.
 * - message (string): A success message indicating that the review was added.
 * @throws {CustomError} If there's an error creating the review.
 *********************************************************************/
module.exports.createReview = catchAsync(async (req, res) => {
  const { comment, rating, id } = req.body
  if (!comment || !rating) {
    throw new CustomError('All input fields are mandatory', 400)
  }
  const newReview = await Review.create({
    comment,
    rating,
    user: req.user.id,
    product: id
  })
  res.status(201).json({
    status: 'success',
    result: 1,
    data: {
      review: newReview
    }
  })
})

/********************************************************************
 * Update existing review. Only authorized users and admins have access.
 * @name updateReview
 * @route POST api/v1/review/update/:reviewId
 * @param {string} req.body.comment - The comment for the review.
 * @param {number} req.body.rating - The rating for the review.
 * @param {Object} req.user - The authenticated user object.
 * @param {string} req.user.id - The user ID of the authenticated user.
 * @returns {Object} Returns a JSON object with the following properties:
 * - success (boolean): Whether the review was successfully created.
 * - message (string): A success message indicating that the review was added.
 * - review (Object)
 * @throws {CustomError} If there's an error creating the review.
 *********************************************************************/
module.exports.updateReview = catchAsync(async (req, res) => {
  const { reviewId } = req.params
  const { comment, rating, id } = req.body
  if (!comment || !rating) {
    throw new CustomError('All input fields are mandatory', 400)
  }
  const updatedReview = await Review.findByIdAndUpdate(
    {
      _id: reviewId
    },
    {
      comment,
      rating,
      user: req.user.id,
      product: id
    }
  )
  res.status(201).json({
    status: 'success',
    result: 1,
    data: {
      updatedReview
    }
  })
})

/******************************************************************
 * Get all the reviews and ratings for all products.
 * @name getAllReviews
 * @route GET api/v1/review/all
 * @returns {Object} Returns a JSON object with the following properties:
 * - success (boolean): Whether the request was successful.
 * - reviews (Array): An array of all the reviews in the database.
 * @throws {CustomError} If there's an error fetching the data from the database.
 ************************************************************************/
module.exports.getAllReviews = catchAsync(async (req, res) => {
  const reviewApiFeatures = new ApiFeatures(req.query, Review.find(), Review)
    .filter()
    .limitFields()
    .populate('user product', 'image name title')
  const paginate = await reviewApiFeatures.paginate()
  const reviews = await reviewApiFeatures.query

  res.status(200).json({
    status: 'success',
    ...paginate,
    result: reviews.length,
    data: {
      reviews
    }
  })
})

/****************************************************************************
Get single review and ratings for a specific product based on product ID.
@name getSingleReview
@route GET api/v1/reviews/:reviewId
@returns {Object} Returns a JSON object with the following properties:
success (boolean): Whether the request was successful.
review (Object): The review object with user, product, and rating details.
@throws {CustomError} If there's an error fetching the data from the database.
******************************************************************************/
module.exports.getSingleReview = catchAsync(async (req, res) => {
  const { reviewId } = req.params
  const review = await Review.findById(reviewId).populate(
    'user product',
    'image name title'
  )
  if (!review) {
    throw new CustomError('Review not found!', 404)
  }
  res.status(200).json({
    status: 'success',
    result: 1,
    data: {
      review
    }
  })
})
/****************************************************************************
Delete a single review based on review ID.
@name deleteSingleReview
@route DELETE api/v1/reviews/:reviewId
@returns {Object} Returns a JSON object with the following properties:
success (boolean): Whether the request was successful.
message (string): A message indicating that the review has been removed.
@throws {CustomError} If there's an error fetching the data from the database.
******************************************************************************/
module.exports.deleteSingleReview = catchAsync(async (req, res) => {
  const { reviewId } = req.params
  const removedReview = await Review.findByIdAndRemove({ _id: reviewId })
  if (!removedReview) {
    throw new CustomError('Review not found!', 404)
  }
  res.status(200).json({
    status: 'success',
    result: 1,
    data: {
      review: removedReview
    }
  })
})
