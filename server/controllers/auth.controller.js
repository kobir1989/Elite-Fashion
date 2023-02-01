const CustomError = require("../helper/customError");
const User = require("../models/user.schema");
const isValidEmail = require("../helper/emailValidator");
const cookieOptions = require("../utils/cookieOptions");
const errorResponse = require("../helper/errorResponse");

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
	console.log(req.body)
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
	console.log(req.body)
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