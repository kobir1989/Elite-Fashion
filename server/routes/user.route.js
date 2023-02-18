const route = require("express").Router();
const { userProfile, updateUserProfile, allUserProfiles } = require("../controllers/user.controller");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const { fileUploader } = require("../middlewares/imgUpload.middleware")

route.post("/user/update/profile/:userId", isAuthenticated, fileUploader, updateUserProfile);
route.get("/user/profile/:userId", isAuthenticated, userProfile);
route.get("/user/all/profile", isAuthenticated, allUserProfiles);

module.exports = route;