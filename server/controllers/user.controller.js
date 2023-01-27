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
      const { _id } = req.user;
      const user = await User.findById({ _id: _id }).populate({
         path: "purchases",
         populate: {
            path: "product._id",
            model: "Product",
            select: "title price image createdAt",
            options: {
               name: "items"
            }
         }
      });

      user.password = undefined;
      if (!user) {
         throw new CustomError(400, "User not found");
      }
      return res.status(200).json({ success: true, user });
   } catch (err) {
      errorResponse(res, err, "USER-PROFILE");
   };
};

/********************************************************
 * @userProfile
 * @Route GET http://localhost:5000/api/v1/user/update/profile/:userId
 * @Description Retrieve user profile, and then sends the resulting data back to the client as a JSON response.
 * @Parameters userId
 * @Return user object
*********************************************************/

module.exports.updateUserProfile = async (req, res) => {
   try {
      const { oldPassword, newPassword, confirmNewPassword, email } = req.body;
      const user = await User.findById({ _id: req.user });
      if (!user) {
         throw new CustomError(404, "User not exists", "email")
      }
      const checkOldPassword = await user.comparePassword(oldPassword);
      if (!checkOldPassword) {
         throw new CustomError(401, "Incrrect Password", "oldPassword");
      };
      if (newPassword.length < 8) {
         throw new CustomError(400, "Password should not be less then 8 characters", "newPassword")
      }
      if (newPassword !== confirmNewPassword) {
         throw new CustomError(400, "Password did not match", "confirmNewPassword");
      };

      user.email = email;
      user.password = newPassword;
      await user.save()

      //After change password or / email user will be logged out 
      res.cookie("token", null, {
         httpOnly: true,
         expires: new Date(Date.now()),
      });
      return res.status(200).json({
         success: true,
         message: "Account update Successfull",
      });
   } catch (err) {
      errorResponse(res, err, "USER-PROFILE-UPDATE")
   }
}