const route = require("express").Router();
const { isAuthenticated } = require("../middlewares/authMiddleware");
const {
   getSingleProductReviews,
   createReview,
   getAllReviews,
   getSingleReview,
   deleteSingleReview
} = require("../controllers/review.controller");

route.get("/reviews/product/:productId", getSingleProductReviews);
route.get("/reviews/all", getAllReviews);
route.get("/review/details/:reviewId", getSingleReview);
route.post("/review/create", isAuthenticated, createReview);
route.delete("/review/delete/:reviewId", isAuthenticated, deleteSingleReview);

module.exports = route;