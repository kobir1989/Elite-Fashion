const config = require("../config/index");
const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = (req, res, next) => {
   const { userId } = req.params;
   const token = req.cookies.token;
   if (!token) {
      return res.status(401).json({
         success: false,
         message: "You are not authorized",
      });
   }
   const isValidUser = jwt.verify(token, config.JWT_SECRET);

   if (userId !== isValidUser._id) {
      return res.status(401).json({ success: false, message: "You are not authorized" })
   }
   req.user = isValidUser._id;
   req.role = isValidUser.role;
   next();
};

module.exports.isAdmin = (req, res, next) => {
   if (req.role !== "ADMIN") {
      return res.status(401).json({
         success: false,
         message: "You are not authorized",
      });
   }
   next();
};
