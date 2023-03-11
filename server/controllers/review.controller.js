const Review = require("../models/review.schema");
const CustomError = require("../helper/customError");
const errorResponse = require("../helper/errorResponse");

/****************************************************************************
Get all the reviews and ratings.
@name getAllReviews
@returns {Object} Returns a JSON object with the following properties:
success (boolean): Whether the request was successful.
reviews (Array): An array of all the reviews in the database based on the product id.
@throws {CustomError} If there's an error fetching the data from the database.
******************************************************************************/
module.exports.getAllReviews = async (req, res) => {
   try {
      const { productId } = req.params;
      const reviews = await Review.find({ product: productId }).populate("user", "image name")
      res.status(200).json({ success: true, reviews });
   } catch (err) {
      errorResponse(res, err, "REVIEW");
   }
};

/*****************************************************************************
Create a new review. Only authorized users and admins have access.
@name createReview
@param {string} req.body.comment - The comment for the review.
@param {number} req.body.rating - The rating for the review.
@param {Object} req.user - The authenticated user object.
@param {string} req.user.id - The user ID of the authenticated user.
@returns {Object} Returns a JSON object with the following properties:
success (boolean): Whether the review was successfully created.
message (string): A success message indicating that the review was added.
@throws {CustomError} If there's an error creating the review.
*******************************************************************************/
module.exports.createReview = async (req, res) => {
   try {
      const { comment, rating, id } = req.body;
      if (!comment || !rating) {
         throw new CustomError(400, "All the input fields are mandatory");
      }
      await Review.create({
         comment,
         rating,
         user: req.user.id,
         product: id
      });
      res.status(200).json({ success: true, message: "Review Added" });
   } catch (err) {
      errorResponse(res, err, "REVIEW-CREATE");
   }
};