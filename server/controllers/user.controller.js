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
 * @updateUserProfile
 * @Route GET http://localhost:5000/api/v1/user/update/profile/:userId
 * @Description Update user profile based on  user _id, 
 * @Parameters email, name, phone, address from req.body
 * @Return success message 
*********************************************************/

module.exports.updateUserProfile = async (req, res) => {
   try {
      const { email, name, phone, address, city, } = req.body;
      if (!email || !name || !phone || !address || !city) {
         throw new CustomError(400, "All the fields mandatory")
      }

      const user = await User.findById({ _id: req.user?._id });
      if (!user) {
         throw new CustomError(404, "User not exists", "email")
      }
      console.log(req.image, "URL")
      user.email = email;
      user.name = name;
      user.phone = phone;
      user.address = address;
      user.city = city;
      user.image = req.image;
      user.imageId = req.imageId;
      await user.save()

      return res.status(200).json({
         success: true,
         message: "Account update Successfull",
      });
   } catch (err) {
      // console.log(err, "ERROR")
      errorResponse(res, err, "USER-PROFILE-UPDATE")
   }
}

/********************************************************
 * @userProfile
 * @Route GET http://localhost:5000/api/v1/user/all/profile
 * @Description Retrieve All user profile , and then sends the resulting data back to the Admin app client as a JSON response.
 * @Parameters userId
 * @Return user object
 *********************************************************/
module.exports.allUserProfiles = async (_req, res) => {
   try {
      //excludes the user with the role "ADMIN",
      let filterQuery = {};
      filterQuery = { role: { $ne: "ADMIN" } };

      const user = await User.find(filterQuery).select("-password").exec();
      if (!user) {
         throw new CustomError(400, "User not found");
      }
      return res.status(200).json({ success: true, user });
   } catch (err) {
      errorResponse(res, err, "USER-PROFILE");
   };
};
