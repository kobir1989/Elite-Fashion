const crypto = require("crypto");
const CustomError = require("../helper/customError");
const User = require("../models/user.schema");
const isValidEmail = require("../helper/emailValidator");
const cookieOptions = require("../utils/cookieOptions");
const errorResponse = require("../helper/errorResponse");
const mailSender = require("../helper/mailSender");
const config = require("../config/index");

/********************************************************
 * @Signup
 * @Route POST http://localhost:5000/api/v1/auth/signup
 * @Description User signup controller for create new user.
 * @Parameters firstName, lastName, email, password, gender
 * @Return user object
 *********************************************************/

module.exports.signUp = async (req, res) => {
	try {
		const { firstName, lastName, email, password, confirmPassword } = req.body;

		if (!firstName || !lastName || !email || !password || !confirmPassword) {
			throw new CustomError(400, "All the input fields are mandatory");
		}

		if (!isValidEmail(email)) {
			throw new CustomError(400, "Invalid Email", "email");
		}

		const isExistingUser = await User.findOne({ email });
		if (isExistingUser) {
			throw new CustomError(400, "User Already exists", "email");
		}

		if (password.length < 8) {
			throw new CustomError(400, "Password should be more then 8 Characters", "password");
		}
		if (password !== confirmPassword) {
			throw new CustomError(400, "Password and Confirm Password does not match", "confirmPassword");
		}

		const user = await User.create({
			name: firstName + " " + lastName,
			email,
			password,
		});

		user.password = undefined;
		const token = user.generateJwtToken();
		const userPayload = {
			_id: user._id,
			name: user.name,
			role: user.role,
		};
		res.cookie("token", token, cookieOptions);
		return res.status(200).json({ success: true, userPayload, token });
	} catch (err) {
		errorResponse(res, err, "SIGNUP")
	}
};

/********************************************************
 * @Login
 * @Route POST http://localhost:5000/api/v1/auth/login
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
		console.log(isPasswordMatch, "USER")
		if (!isPasswordMatch) {
			throw new CustomError(401, "Invalid Credentials");
		}
		user.password = undefined;
		const token = user.generateJwtToken();
		const userPayload = {
			_id: user._id,
			name: user.name,
			role: user.role,
		};
		res.cookie("token", token, cookieOptions);
		res.status(200).json({ success: true, userPayload, token });
	} catch (err) {
		errorResponse(res, err, "LOGIN");
	};
};

/********************************************************
 * @adminLogin
 * @Route GET http://localhost:5000/api/v1/admin/login
 * @Description Only admin can login useing this route.
 * @Parameters  email, password  from req.body
 * @Return user object and token
 ********************************************************/
module.exports.adminLogin = async (req, res) => {
	// console.log(req.body)
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			throw new CustomError(400, "All the input fields are mandatory");
		}

		const user = await User.findOne({ email });
		if (!user) {
			throw new CustomError(401, "Invalid Credentials");
		}

		if (user.role !== "ADMIN") {
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
			role: user.role,
		};
		res.cookie("token", token, cookieOptions);
		res.status(200).json({ success: true, userPayload, token });
	} catch (err) {
		errorResponse(res, err, "LOGIN");
	};
};


//TODO: Forget password Controller
/********************************************************
 * @forgetPassword
 * @Route POST http://localhost:5000/api/v1/auth/forget/password
 * @Description User or Admin can reset Their Password
 * @Parameters  
 * @Return 
 ********************************************************/
module.exports.forgotPassword = async (req, res) => {
	let user;

	try {
		const { email } = req.body;
		if (!email) {
			throw new CustomError(400, "Invalid Email", "email");
		}
		if (!isValidEmail(email)) {
			throw new CustomError(400, "Invalid Email", "email");
		}

		user = await User.findOne({ email });
		if (!user) {
			throw new CustomError(400, "User not found", "email");
		}

		const resetToken = user.generateForgetPassToken();

		await user.save({ validateBeforeSave: false });

		// const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/forget/password/${resetToken}`;
		const resetUrl = `${config.CLIENT_URL}/reset/password/${resetToken}`;
		console.log(resetUrl, "RESET")
		const text = `
		 <div style="background-color: #ffffff; padding: 10px;">
			<h1 style="margin-bottom: 15px; color: #212529;">Reset Your Password</h1>
			<p style="font-size: 18px;">Click the link below to reset your password:</p>
			<a style="display: inline-block;
			  padding: 10px 20px;
			  background-color: #3f7fb8;
			  color: #fff;
			  text-decoration: none;
			  border-radius: 5px;" href=${resetUrl}>Reset Password</a>
			<p>If you did not request a password reset, please ignore this email.</p>
		 </div>
	  `;

		// Send email
		await mailSender(user?.email, text, "Reset Your Password - Elite Fashion");

		res.status(200).json({
			success: true,
			message: `Password reset email has been sent to your email ${user.email}`,
		});
	} catch (err) {
		if (user) {
			// Roll back - clear fields and save
			user.forgetPasswordToken = undefined;
			user.forgetPasswordExpiry = undefined;
			await user.save({ validateBeforeSave: false });
		}
		errorResponse(res, err, "FORGET-PASSWORD");
	}
};


/********************************************************
 * @resetPassword
 * @Route POST http://localhost:5000/api/v1/reset/password/:resetToken
 * @Description User or Admin can reset Their Password
 * @Parameters  
 * @Return 
 ********************************************************/

exports.resetPassword = async (req, res) => {
	try {
		const { resetToken } = req.params;

		if (!resetToken) {
			throw new CustomError(403, 'Invalid Token', 'password');
		}

		const { password, confirmPassword } = req.body;

		if (!password || !confirmPassword) {
			throw new CustomError(400, 'Password and Confirm Password are required', 'password');
		}

		const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
		const user = await User.findOne({
			forgetPasswordToken: resetPasswordToken,
			forgetPasswordExpiry: { $gt: Date.now() },
		});

		if (!user) {
			throw new CustomError(403, "The reset token you provided is invalid or has expired", 'password');
		}

		if (password !== confirmPassword) {
			throw new CustomError(400, 'Incorrect Password', 'confirmPassword');
		}
		user.password = password;
		user.forgetPasswordToken = undefined;
		user.forgetPasswordExpiry = undefined;

		await user.save({ validateBeforeSave: false });

		res.status(200).json({
			success: true,
			message: 'Password updated',
		});
	} catch (err) {
		errorResponse(res, err, 'FORGET-PASSWORD-CONTROLLER');
	}
};
