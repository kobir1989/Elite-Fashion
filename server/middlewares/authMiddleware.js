const config = require("../config/index");
const jwt = require("jsonwebtoken");

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