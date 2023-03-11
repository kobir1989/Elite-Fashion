const route = require("express").Router();
const { isAuthenticated } = require("../middlewares/authMiddleware");
const { getAllReviews, createReview } = require("../controllers/review.controller");

route.get("/reviews/all/:productId", getAllReviews);
route.post("/review/create", isAuthenticated, createReview);

module.exports = route;