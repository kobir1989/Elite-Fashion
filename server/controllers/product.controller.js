const Product = require('../models/product.schema')
const CustomError = require('../helper/customError')
const ApiFeatures = require('../service/apiFeatures')
const catchAsync = require('../utils/catchAsync')

/********************************************************
 * @createNewProduct
 * @description Create a new product. Only admin users are authorized.
 * @route POST /api/v1/products
 * @param {string} req.body.title - Product title
 * @param {string} req.body.description - Product description
 * @param {number} req.body.price - Product price
 * @param {number} req.body.sellPrice - Product sell price
 * @param {number} req.body.productCost - Product cost
 * @param {number} req.body.stock - Product stock
 * @param {string} req.body.category - Product category ID
 * @param {string} req.body.subCategory - Product sub-category ID
 * @param {string} req.body.image - Base64-encoded image data
 * @param {string} req.body.imageId - Cloudinary image ID
 * @returns {Object} A success message
 * @throws {CustomError} If the user is not authorized or if any of the required fields is missing.
 *********************************************************/
module.exports.createNewProduct = catchAsync(async (req, res) => {
  //only ADMIN has access.
  if (req.user.role !== 'ADMIN') {
    throw new CustomError(
      'Access denied. You are not authorized to access this resource.',
      401
    )
  }
  const {
    title,
    description,
    price,
    sellPrice,
    productCost,
    stock,
    category,
    subCategory
  } = req.body
  if (
    !title ||
    !description ||
    !price ||
    !sellPrice ||
    !productCost ||
    !stock ||
    !category ||
    !subCategory
  ) {
    throw new CustomError('All the fields are mandatory', 400)
  }

  const newProduct = await Product.create({
    title,
    description,
    price,
    sellPrice,
    productCost,
    stock,
    image: req.image,
    imageId: req.imageId,
    category,
    subCategory
  })

  return res.status(201).json({
    status: 'success',
    result: 1,
    data: {
      newProduct
    }
  })
})

/********************************************************
 * @editProduct
 * @Route GET /api/v1/products/edit/:userId/:productId
 * @Description Edit product controller, only admin has access to edit product.
 * @param {string} req.params.productId - The ID of the product to be edited
 * @param {string} req.body.title - The updated title of the product
 * @param {string} req.body.description - The updated description of the product
 * @param {number} req.body.price - The updated price of the product
 * @param {number} req.body.sellPrice - The updated sell price of the product
 * @param {number} req.body.productCost - The updated product cost of the product
 * @param {number} req.body.stock - The updated stock of the product
 * @param {string} req.body.category - The updated category of the product
 * @param {string} req.body.subCategory - The updated subcategory of the product
 * @param {object} req.image - The updated image file of the product
 * @param {string} req.imageId - The updated image ID of the product
 * @returns {object} The updated product and a success message
 *********************************************************/
module.exports.editProduct = catchAsync(async (req, res) => {
  //only ADMIN has access.
  if (req.user.role !== 'ADMIN') {
    throw new CustomError(
      'Access denied. You are not authorized to access this resource.',
      401
    )
  }
  const { productId } = req.params
  const {
    title,
    description,
    price,
    sellPrice,
    productCost,
    stock,
    category,
    subCategory
  } = req.body

  if (
    !title ||
    !description ||
    !price ||
    !sellPrice ||
    !productCost ||
    !stock ||
    !category ||
    !subCategory
  ) {
    throw new CustomError('All the fields are mandatory', 400)
  }
  const updateProduct = await Product.findByIdAndUpdate(
    {
      _id: productId
    },
    {
      title,
      description,
      price,
      sellPrice,
      productCost,
      image: req.image,
      imageId: req.imageId,
      stock,
      category,
      subCategory
    },
    {
      new: true,
      runValidators: true
    }
  )
  if (!updateProduct) {
    throw new CustomError('Update product failed, please try again', 400)
  }

  return res.status(201).json({
    status: 'success',
    result: 1,
    data: {
      updateProduct
    }
  })
})

/********************************************************
 * @deleteProduct
 * @Route DELETE /api/v1/products/remove/:userId/:productId
 * @Description Delete product controller, only admin has access to delete product.
 * @param {string} productId - The ID of the product to delete.
 * @returns {object} - A success message indicating that the product has been deleted.
 *********************************************************/
module.exports.deleteProduct = catchAsync(async (req, res) => {
  // Only ADMIN has access.
  if (req.user.role !== 'ADMIN') {
    throw new CustomError(
      'Access denied. You are not authorized to access this resource.',
      401
    )
  }

  const { productId } = req.params
  const deletedProduct = await Product.findByIdAndRemove({ _id: productId })

  if (!deletedProduct) {
    throw new CustomError('Product delete failed', 400)
  }

  return res.status(201).json({
    status: 'success',
    result: 1,
    data: {
      deletedProduct
    }
  })
})

/********************************************************
 * @getAllProducts
 * @description Retrieve all products from the database.
 * @route GET /api/v1/products/all
 * @throws {CustomError} 500 - Server error
 * @returns {Object} Products array
 ********************************************************/
module.exports.getAllProducts = catchAsync(async (req, res) => {
  const productsApiFeatures = new ApiFeatures(
    req.query,
    Product.find(),
    Product
  )
    .filter()
    .limitFields()
  const paginate = await productsApiFeatures.pagination()
  const products = await productsApiFeatures.query

  res.status(200).json({
    status: 'success',
    results: products.length,
    ...paginate,
    data: {
      products
    }
  })
})

/********************************************************
 * Retrieves a single product based on the provided product ID and then sends the resulting data back to the client as a JSON response.
 * @getSingleProducts
 * @route GET /api/v1/product/single/:productId
 * @throws {CustomError} 400 - Product ID is required
 * @returns {object} - Product object
 *********************************************************/
module.exports.getSingleProducts = catchAsync(async (req, res) => {
  const { productId } = req.params

  if (!productId) {
    throw new CustomError('Product ID is required', 400)
  }

  const product = await Product.findById(productId)
    .populate('category subCategory', '_id name')
    .exec()

  return res.status(200).json({
    status: 'success',
    result: product.length,
    data: {
      product
    }
  })
})

/********************************************************
 * @getBestSellingProducts
 * @Route GET /api/v1/product/best-selling
 * @description Retrieves the best-selling products and sends them back to the client as a JSON response.
 * @returns {Object} - Products Array with a limit of 12
 *********************************************************/
module.exports.getBestSellingProducts = catchAsync(async (_req, res) => {
  const products = await Product.aggregate([{ $sample: { size: 12 } }])
  return res.status(200).json({
    status: 'success',
    result: products.length,
    data: {
      products
    }
  })
})
