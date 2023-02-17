const Product = require("../models/product.schema");
const CustomError = require("../helper/customError");
const errorResponse = require("../helper/errorResponse");

/********************************************************
 * @createNewProduct
 * @Route GET http://localhost:5000/api/v1/create/product/:userId
 * @Description Create new product, only Admin has access to create new product.
 * @Parameters title, descreption, price, image, stock, categoryId,   subCategoryId,
 * @Return success message
 *********************************************************/
module.exports.createNewProduct = async (req, res) => {
   try {
      //only ADMIN has access.
      if (req.user.role !== "ADMIN") {
         throw new CustomError(401, "Access denied. You are not authorized to access this resource.");
      };
      const {
         title,
         description,
         price,
         sellPrice,
         productCost,
         stock,
         category,
         subCategory,
      } = req.body;
      console.log(req.body)
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
         throw new CustomError(400, "All the fields are mandatory", "all");
      };

      await Product.create({
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
      });

      return res.status(200).json({
         success: true,
         message: "New Product added"
      })

   } catch (err) {
      errorResponse(res, err, "CREATE-NEW-PRODUCT");
   }
}

/********************************************************
 * @editProduct
 * @Route GET http://localhost:5000/api/v1/products/edit/:userId/:productId
 * @Description Edit product controller, only admin has access to edit product.
 * @Parameters title, descreption, price, image, stock, categoryId,   subCategoryId,
 * @Return success message
 *********************************************************/
module.exports.editProduct = async (req, res) => {
   try {
      //only ADMIN has access.
      if (req.user.role !== "ADMIN") {
         throw new CustomError(401, "Access denied. You are not authorized to access this resource.");
      };
      const { productId } = req.params;
      const {
         title,
         description,
         price,
         sellPrice,
         productCost,
         stock,
         category,
         subCategory,
      } = req.body;

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
         throw new CustomError(400, "All the fields are mandatory");
      };
      const updateProduct = await Product.findByIdAndUpdate(
         {
            _id: productId
         },
         {
            title, description, price, sellPrice, productCost, image: req.image, imageId: req.imageId, stock, category, subCategory
         },
         {
            new: true, runValidators: true
         }
      );
      if (!updateProduct) {
         throw new CustomError(400, "Update product failed, please try again")
      }

      return res.status(200).json({
         success: true,
         message: "Product updated successfully"
      })

   } catch (err) {
      console.log(err)
      errorResponse(res, err, "EDIT-PRODUCT");
   }
}

/********************************************************
 * @deleteProduct
 * @Route DELETE http://localhost:5000/api/v1/products/remove/:userId/:productId
 * @Description Delete product controller, only admin has access to edit product.
 * @Parameters productId
 * @Return success message.
 *********************************************************/
module.exports.deleteProduct = async (req, res) => {
   try {
      //only ADMIN has access.
      if (req.user.role !== "ADMIN") {
         throw new CustomError(401, "Access denied. You are not authorized to access this resource.");
      };
      const { productId } = req.params;
      const deleteProduct = await Product.findByIdAndRemove({ _id: productId });
      if (!deleteProduct) {
         throw new CustomError(400, "Product delete failed")
      }
      return res.status(200).json({
         success: true,
         message: "Product deleted successfully"
      })

   } catch (err) {
      errorResponse(res, err, "DELETE-PRODUCT");
   }
}

/********************************************************
 * @getProductsByLimits
 * @Route GET http://localhost:5000/api/v1/:subCategoryId/product?page=1&limit=12
 * @Description Retrieve products, based on page number and limit, and then 
 * @Description sends the resulting data back to the client as a JSON response.
 * @Parameters none
 * @Return Products Array
 *********************************************************/
module.exports.getProductsByLimits = async (req, res) => {
   try {
      const { page, limit } = req.query;
      const { subCategoryId } = req.params;

      if (!page || !limit || !subCategoryId) {
         throw new CustomError(400, "Page, Limit and Sub Category Id are required");
      }

      const startsIndexAt = (page - 1) * limit;
      const endsIndexAt = page * limit;

      const totalCount = await Product.countDocuments({ "subCategory": subCategoryId });
      const products = {};

      products.result = await Product.find({ "subCategory": subCategoryId })
         .select("-sold -productCost")
         .limit(limit)
         .skip(startsIndexAt)
         .exec();

      if (endsIndexAt < totalCount) {
         products.next = {
            page: parseInt(page) + 1,
            limit: limit
         };
      }

      if (startsIndexAt > 0) {
         products.previous = {
            page: page - 1,
            limit: limit
         };
      }
      products.totalPage = Math.ceil(totalCount / limit);

      return res.status(200).json({ success: true, products });
   } catch (err) {
      errorResponse(res, err, "GET-PAGINATED-PRODUCTS");
   }
};

/********************************************************
 * @getAllProducts
 * @Route GET http://localhost:5000/api/v1/products/all
 * @Description Retrieve All products from db.
 * @Parameters none
 * @Return Products Array
 *********************************************************/
module.exports.getAllProducts = async (_req, res) => {
   try {
      const products = await Product.find().populate("subCategory category", "_id name");
      res.status(200).json({ success: true, products })

   } catch (err) {
      errorResponse(res, err, "GET-ALL-PRODUCTS")
   }

}

/********************************************************
 * @getSingleProducts
 * @Route GET http://localhost:5000/api/v1/product/single/:productId
 * @Description Retrieve single product, and then sends the resulting data back to the client as a JSON response.
 * @Parameters product id from req.params
 * @Return Products Array
 *********************************************************/
module.exports.getSingleProducts = async (req, res) => {
   try {
      const { productId } = req.params;
      const products = await Product.findById({ _id: productId }).populate("category subCategory", "_id name").exec();
      return res.status(200).json({ success: true, products })
   } catch (err) {
      errorResponse(res, err, "GET-SINGLE_PRODUCT");
   }
}

/********************************************************
 * @getBestSellingProducts
 * @Route GET http://localhost:5000/api/v1/product/best-selling
 * @Description Retrieve Best selling products, and then sends the resulting data back to the client as a JSON response.
 * @Parameters none
 * @Return Products Array limit 12
 *********************************************************/

module.exports.getBestSellingProducts = async (req, res) => {
   try {
      const products = await Product.aggregate([{ $sample: { size: 12 } }])
      // console.log(products)
      return res.status(200).json({ success: true, products })
   } catch (err) {
      errorResponse(res, err, "GET-BEST-SELLING-PRODUCT");
   }

}
