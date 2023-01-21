const route = require("express").Router();
const { userProfile, updateUserProfile } = require("../controllers/user.controller");
const { isAuthenticated } = require("../middlewares/authMiddleware");

route.post("/user/update/profile/:userId", isAuthenticated, updateUserProfile);
route.get("/user/profile/:userId", isAuthenticated, userProfile);

module.exports = route;