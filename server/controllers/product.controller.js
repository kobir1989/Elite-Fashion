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
      const {
         title,
         description,
         price,
         stock,
         categoryId,
         subCategoryId,
      } = req.body;
      console.log(req.body)
      if (!title || !description || !price || !stock || !categoryId || !subCategoryId) {
         throw new CustomError(400, "All the fields are mandatory");
      };

      await Product.create({
         title,
         description,
         price,
         image: req.imageUrl,
         stock,
         category: categoryId,
         subCategory: subCategoryId,
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
      const {
         title,
         description,
         price,
         image,
         stock,
         categoryId,
         subCategoryId,
      } = req.body;
      const { productId } = req.params;
      if (
         !title ||
         !description ||
         !price ||
         !image ||
         !stock ||
         !categoryId ||
         !subCategoryId
      ) {
         throw new CustomError(400, "All the fields are mandatory");
      };
      const updateProduct = await Product.findByIdAndUpdate(
         {
            _id: productId
         },
         {
            title, description, price, image, stock, categoryId, subCategoryId
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
 * @getAllProducts
 * @Route GET http://localhost:5000/api/v1/products/all
 * @Description Retrieve All products, and then sends the resulting data back to the client as a JSON response.
 * @Parameters none
 * @Return Products Array
 *********************************************************/
module.exports.getAllProducts = async (req, res) => {
   try {
      const { page, limit } = req.query;
      const { subCategoryId } = req.params;
      const startsIndexAt = (page - 1) * limit;
      const endsIndexAt = page * limit;
      const products = {};
      if (!page || !limit) {
         throw new CustomError(400, "Page and Limit are required")
      }

      const docLength = await Product.find({ "subCategory": subCategoryId }).countDocuments().exec();

      if (endsIndexAt < docLength) {
         products.next = {
            page: parseInt(page) + 1,
            limit: limit
         }
      };

      if (startsIndexAt > 0) {
         products.previous = {
            page: page - 1,
            limit: limit
         }
      };

      if (docLength) {
         products.totalPage = Math.floor(docLength / parseInt(limit) + 1);
      };

      products.result = await Product.find({ "subCategory": subCategoryId })
         .select("-sold")
         .limit(limit)
         .skip(startsIndexAt)
         .exec();

      return res.status(200).json({ success: true, products })
   } catch (err) {
      errorResponse(res, err, "GET-ALL-PRODUCTS");
   }
};