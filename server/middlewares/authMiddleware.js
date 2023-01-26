const config = require("../config/index");
const jwt = require("jsonwebtoken");
const User = require("../models/user.schema");

/********************************************************
 * @isAuthenticated Middleware
 * @Description This middleware is used to check the presence of a JSON Web Token (JWT) in the request's cookies and verifies it using a secret stored in the config file.
 * @Parameters
 *   - req: The request object
 *   - res: The response object
 *   - next: The callback function to move to the next middleware
 *
 * @Return   - If the token is invalid the middleware will return a 401 Unauthorized response.
 *********************************************************/
module.exports.isAuthenticated = async (req, res, next) => {
   try {
      let token;
      if (req.headers.authorization
         && req.headers.authorization.startsWith("Bearer")) {
         token = req.headers.authorization.split(" ")[1]
      }
      if (!token) {
         return res.status(401).json({
            success: false,
            message: "You are not authorized",
         });
      }

      const decodedJwtPayload = jwt.verify(token, config.JWT_SECRET);
      console.log(decodedJwtPayload)
      const user = await User.findById(decodedJwtPayload._id, "name _id role")
      if (!user) {
         return res.status(401).json({
            success: false,
            message: "You are not authorized",
         });
      }
      // console.log(user)
      req.user = user;
      next();
   } catch (err) {
      console.log(err, "EEEEEEEE")
      res.status(403).json({ success: false, message: "Unauthorized" })
   }
};

//********DEPRICATED******** */
// module.exports.isAdmin = (req, res, next) => {
//    if (req.role !== "ADMIN") {
//       return res.status(401).json({
//          success: false,
//          message: "You are not authorized",
//       });
//    }
//    next();
// };

// module.exports.isUser = (req, res, next) => {
//    if (req.role !== "USER") {
//       return res.status(401).json({
//          success: false,
//          message: "You are not authorized token",
//       });
//    }
//    next()
// }