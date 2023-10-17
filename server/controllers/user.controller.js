const CustomError = require('../helper/customError')
const User = require('../models/user.schema')
const catchAsync = require('../utils/catchAsync')

/************************************************************
 * Retrieve user profile for the logged in user.
 *@userProfile
 * @route GET /api/v1/user/profile/:userId
 * @param {string} userId - The ID of the user.
 * @returns {object} The user profile.
 * @throws {CustomError} Error if user not found.
 ***********************************************************/
module.exports.userProfile = catchAsync(async (req, res) => {
  const { _id } = req.user
  const user = await User.findById({ _id: _id }).populate({
    path: 'purchases',
    populate: {
      path: 'product._id',
      model: 'Product',
      select: 'title price image createdAt',
      options: {
        name: 'items'
      }
    }
  })

  user.password = undefined
  if (!user) {
    throw new CustomError('User not found', 400)
  }
  return res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})

/*************************************************************************
 * Update user profile for the logged in user.
 * @updateUserProfile
 * @route PUT /api/v1/user/update/profile/:userId
 * @param {string} userId - The ID of the user.
 * @param {string} email - The email of the user.
 * @param {string} name - The name of the user.
 * @param {string} phone - The phone number of the user.
 * @param {string} address - The address of the user.
 * @param {string} city - The city of the user.
 * @returns {object} Success message.
 * @throws {CustomError} Error if any of the fields are missing or user not found.
 **************************************************************************/
module.exports.updateUserProfile = catchAsync(async (req, res) => {
  const { email, name, phone, address, city } = req.body

  if (!email || !name || !phone || !address || !city) {
    throw new CustomError('All fields are mandatory', 400)
  }

  const user = await User.findById({ _id: req.user?._id })
  if (!user) {
    throw new CustomError('User not found', 'email', 404)
  }
  user.email = email
  user.name = name
  user.phone = phone
  user.address = address
  user.city = city
  user.image = req.image
  user.imageId = req?.imageId
  await user.save()

  return res.status(201).json({
    status: 'success',
    data: {
      user
    }
  })
})

/**********************************************************************
 * Retrieve all user profiles for the admin user.
 * @allUserProfiles
 * @route GET /api/v1/user/all/profile
 * @returns {object} The user profiles for all non-admin users.
 * @throws {CustomError} Error if no users found.
 **********************************************************************/
module.exports.allUserProfiles = catchAsync(async (_req, res) => {
  //excludes the user with the role "ADMIN",
  let filterQuery = {}
  filterQuery = { role: { $ne: 'ADMIN' } }

  const user = await User.find(filterQuery).select('-password').exec()
  if (!user) {
    throw new CustomError('User not found', 400)
  }
  return res.status(200).json({
    status: 'success',
    result: 1,
    data: {
      user
    }
  })
})

/************************************************************
 * Update Admin Profile.
 *@userProfile
 * @route GET /api/v1/admin/profile/:adminId
 * @param {string} adminId - The ID of the admin.
 * @param {string} email - The email of the admin.
 * @param {string} name - The name of the admin.
 * @returns {object} success message.
 * @throws {CustomError} Error if admin not found.
 ***********************************************************/
module.exports.updateAdminProfile = catchAsync(async (req, res) => {
  const { email, name } = req.body
  if (!email || !name) {
    throw new CustomError('All fields are mandatory', 400)
  }

  const user = await User.findById({ _id: req.user?._id })
  if (!user) {
    throw new CustomError('User not found', 404)
  }
  user.email = email
  user.name = name
  user.image = req.image
  user.imageId = req?.imageId
  await user.save()

  return res.status(201).json({
    status: 'success',
    result: 1,
    data: {
      user
    }
  })
})
