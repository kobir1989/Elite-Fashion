const CustomError = require("../helper/customError");
const User = require("../models/user.schema");
const errorResponse = require("../helper/errorResponse");

/********************************************************
 * @userProfile
 * @Route GET http://localhost:5000/api/v1/user/profile/:userId
 * @Description Retrieve user profile, and then sends the resulting data back to the client as a JSON response.
 * @Parameters userId
 * @Return user object
 *********************************************************/
module.exports.userProfile = async (req, res) => {
   try {
      const { userId } = req.params;
      const user = await User.findById({ _id: userId });
      user.password = undefined;
      if (!user) {
         throw new CustomError(400, "User not found");
      }
      return res.status(200).json({ success: true, user });
   } catch (err) {
      errorResponse(res, err, "USER-PROFILE");
   };
};