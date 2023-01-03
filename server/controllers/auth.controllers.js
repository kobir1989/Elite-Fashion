const CustomError = require("../helper/customError");
const User = require("../models/user.schema");
const jwt = require("jsonwebtoken");
const config = require("../config/index");
const isValidEmail = require("../helper/emailValidator");
const cookieOptions = require("../utils/cookieOptions")

/********************************************************
 * @Signup
 * @Route http://localhost:5000/api/v1/auth/signup
 * @Description User signup controller for create new user.
 * @Parameters firstName, lastName, email, password, gender
 * @Return user object
 *********************************************************/

module.exports.signUp = async (req, res) => {
   try {
      const {
         firstName,
         lastName,
         email,
         password,
         confirmPassword,
         gender
      } = req.body;

      if (!firstName || !lastName || !email || !password || !gender) {
         throw new CustomError(400, "All the input fields are mandatory")
      }

      if (!isValidEmail(email)) {
         throw new CustomError(400, "Invalid Email")
      }

      const isExistingUser = await User.findOne({ email });
      if (isExistingUser) {
         throw new CustomError(400, "User Already exists")
      }

      if (password.length < 8) {
         throw new CustomError(400, "Password should be more then 8 Characters")
      }
      if (password !== confirmPassword) {
         throw new CustomError(400, "Password and Confirm Password does not match")
      }

      const user = await User.create({
         name: firstName + " " + lastName,
         gender,
         email,
         password,
      })

      user.password = undefined;
      const token = user.generateJwtToken();
      const userPayload = {
         _id: user._id,
         name: user.name,
         role: user.role
      }

      res.cookie("token", token, cookieOptions);
      res.status(200).json({ success: true, userPayload })

   } catch (err) {
      res.status(err.code || 500).json(
         {
            success: false,
            message: err.message
         }
      );
      console.log(err.message, "ERROR FROM SIGNUP CONTROLLER")
   }

}

/********************************************************
 * @Login
 * @Route http://localhost:5000/api/v1/auth/login
 * @Description User login controller.
 * @Parameters email, password
 * @Return user object
 *********************************************************/

module.exports.login = async (req, res) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         throw new CustomError(400, "All the input fields are mandatory");
      }

      const user = await User.findOne({ email });
      if (!user) {
         throw new CustomError(401, "Invalid Credentials");
      }

      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
         throw new CustomError(401, "Invalid Credentials");
      }
      user.password = undefined;
      const token = user.generateJwtToken();
      const userPayload = {
         _id: user._id,
         name: user.name,
         role: user.role
      }
      res.cookie("token", token, cookieOptions);
      res.status(200).json({ success: true, userPayload })

   } catch (err) {
      res.status(err.code || 500).json(
         {
            success: false,
            message: err.message
         }
      );
      console.log(err.message, "ERROR FROM LOGIN CONTROLLER")
   }
}