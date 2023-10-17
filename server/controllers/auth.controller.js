const crypto = require('crypto')
const CustomError = require('../helper/customError')
const User = require('../models/user.schema')
const isValidEmail = require('../helper/emailValidator')
const cookieOptions = require('../utils/cookieOptions')
const mailSender = require('../helper/mailSender')
const config = require('../config/index')
const catchAsync = require('../utils/catchAsync')
const forgetPasswordEmailBody = require('../templates/emailTemplate')

/**********************************************************
 * Create a new user Controller.
 * @route POST /api/v1/auth/signup
 * @param {string} firstName.required - User's first name
 * @param {string} lastName.required - User's last name
 * @param {string} email.required - User's email address
 * @param {string} password.required - User's password
 * @returns {object} 200 - User object
 * @throws {CustomError} 400 - All the input fields are mandatory
 * @throws {CustomError} 400 - Invalid email
 * @throws {CustomError} 400 - User already exists with this email
 * @throws {CustomError} 400 - Password should be more than 8 characters
 * @throws {CustomError} 400 - Password and Confirm Password does not match
 * @throws {CustomError} 500 - Internal server error
 ***************************************************************/
module.exports.signUp = catchAsync(async (req, res, _next) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    throw new CustomError('All the input fields are mandatory', 400)
  }

  if (!isValidEmail(email)) {
    throw new CustomError('Invalid email', 400)
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new CustomError('User already exists with this email', 400)
  }

  if (password.length < 8) {
    throw new CustomError('Password should be more than 8 characters', 400)
  }

  if (password !== confirmPassword) {
    throw new CustomError(
      'Password and Confirm Password does not match',
      'confirmPassword',
      400
    )
  }

  const name = `${firstName} ${lastName}`
  const user = await User.create({ name, email, password })

  user.password = undefined
  const token = user.generateJwtToken()

  res.cookie('token', token, cookieOptions)

  res.status(201).json({
    status: 'success',
    result: 1,
    data: {
      token
    }
  })
})

/******************************************************************
 * User login Controller.
 * @route POST /api/v1/auth/login
 * @param {string} email.required - User's email address
 * @param {string} password.required - User's password
 * @returns {object} 200 - User object and JWT Token
 * @throws {CustomError} 400 - All the input fields are mandatory
 * @throws {CustomError} 401 - Invalid Credentials
 * @throws {CustomError} 500 - Internal server error
 ******************************************************************/
module.exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new CustomError('All the input fields are mandatory', 400)
  }

  const user = await User.findOne({ email })
  if (!user) {
    throw new CustomError('Invalid Credentials', 401)
  }

  const isPasswordMatch = await user.comparePassword(password)
  if (!isPasswordMatch) {
    throw new CustomError('Invalid Credentials', 401)
  }

  const token = user.generateJwtToken()

  res.cookie('token', token, cookieOptions)
  res.status(200).json({
    status: 'success',
    result: 1,
    data: {
      token
    }
  })
})

/*************************************************************************
 * Only admin can login using this route.
 * @route POST /api/v1/admin/login
 * @param {string} email.required - User's email address
 * @param {string} password.required - User's password
 * @returns {object} 200 - User object and JWT token
 * @throws {CustomError} 400 - All the input fields are mandatory
 * @throws {CustomError} 401 - Invalid credentials
 * @throws {CustomError} 500 - Internal server error
 **************************************************************************/
module.exports.adminLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new CustomError('All the input fields are mandatory', 400)
  }

  const user = await User.findOne({ email })
  if (!user) {
    throw new CustomError('Invalid credentials', 401)
  }

  if (user.role !== 'ADMIN') {
    throw new CustomError('Invalid credentials', 401)
  }

  const isPasswordMatch = await user.comparePassword(password)
  if (!isPasswordMatch) {
    throw new CustomError('Invalid credentials', 401)
  }

  const token = user.generateJwtToken()

  res.cookie('token', token, cookieOptions)
  res.status(200).json({
    status: 'success',
    result: 1,
    data: {
      token
    }
  })
})

/***************************************************************************
 * Generates a forget password token and sends a reset password email to the user's email address.
 * @route POST /api/v1/admin/login
 * @param {string} email.required - User's email address
 * @returns {object} Returns a JSON object with a success property indicating whether the operation was successful and a message property containing a message indicating whether the reset password email has been sent to the user's email address.
 * @throws {CustomError} If the email is invalid, the user is not found, or an error occurred while sending the reset password email.
 *****************************************************************************/
module.exports.forgotPassword = async (req, res) => {
  let user

  try {
    const { email } = req.body
    if (!email) {
      throw new CustomError('Invalid Email', 400)
    }
    if (!isValidEmail(email)) {
      throw new CustomError('Invalid Email', 400)
    }

    user = await User.findOne({ email })
    if (!user) {
      throw new CustomError('User not found', 400)
    }

    const resetToken = user.generateForgetPassToken()

    await user.save({ validateBeforeSave: false })

    // const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/forget/password/${resetToken}`;
    const resetUrl = `${config.CLIENT_URL}/reset/password/${resetToken}`

    // Send email
    await mailSender(
      user?.email,
      forgetPasswordEmailBody(resetUrl),
      'Reset Your Password - Elite Fashion'
    )

    res.status(200).json({
      status: 'success',
      message: `Password reset email has been sent to your email ${user.email}`
    })
  } catch (err) {
    if (user) {
      // Roll back - clear fields and save
      user.forgetPasswordToken = undefined
      user.forgetPasswordExpiry = undefined
      await user.save({ validateBeforeSave: false })
    }
    res.status(500).json({ status: 'error', message: 'Something went wrong!' })
  }
}

/*****************************************************************************
 * Resets the password for the user or admin account with the provided reset token.
 * @route POST /api/v1/reset/password/:resetToken
 * @param {string} email.required - User's email address
 * @param {string} resetToken.required - User's email address
 * @Return Returns a JSON object with a success message if the password is updated successfully.
 * @throws {CustomError} - If the reset token is invalid or has expired, or if the password and confirm password do not match
 ******************************************************************************/
exports.resetPassword = catchAsync(async (req, res) => {
  const { resetToken } = req.params

  if (!resetToken) {
    throw new CustomError('Invalid Token', 403)
  }

  const { password, confirmPassword } = req.body

  if (!password || !confirmPassword) {
    throw new CustomError('Password and Confirm Password are required', 400)
  }

  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  const user = await User.findOne({
    forgetPasswordToken: resetPasswordToken,
    forgetPasswordExpiry: { $gt: Date.now() }
  })

  if (!user) {
    throw new CustomError(
      'The reset token you provided is invalid or has expired',
      403
    )
  }

  if (password !== confirmPassword) {
    throw new CustomError('Password and Confirm Password do not match', 400)
  }

  user.password = password
  user.forgetPasswordToken = undefined
  user.forgetPasswordExpiry = undefined

  await user.save({ validateBeforeSave: false })

  res.status(200).json({
    status: 'success',
    message: 'Password updated'
  })
})

/*************************************************************************
Logout controller.
@route POST /api/v1/auth/logout
@summary Logs out the user by resetting the token cookie.
@returns {Object} Returns a JSON object with a success message and null token.
@throws {Object} errorResponse - Throws an error response object with a 500 status code if an error occurs.
*****************************************************************************/
module.exports.logout = catchAsync(async (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  })
  res.status(200).json({
    status: 'success',
    data: {
      token: null
    }
  })
})
