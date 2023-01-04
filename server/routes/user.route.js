const route = require("express").Router();
const { userProfile } = require("../controllers/user.controller");
const { isAuthenticated } = require("../middlewares/authMiddleware");

route.get("/user/profile/:userId", isAuthenticated, userProfile);

module.exports = route;