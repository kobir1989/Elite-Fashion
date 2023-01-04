const Product = require("../models/product.schema");
const CustomError = require("../helper/customError")


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
         image,
         stock,
         categoryId,
         subCategoryId,
      } = req.body;

      if (
         !title || !description || !price || !image || !stock || !categoryId ||
         !subCategoryId) {
         throw new CustomError(400, "All the fields are mandatory");
      };

      await Product.create({
         title,
         description,
         price,
         image,
         stock,
         category: categoryId,
         subCategory: subCategoryId,
      });

      return res.status(200).json({
         success: true,
         message: "New Product added"
      })

   } catch (err) {
      return res.status(err.code || 500).json({
         success: false,
         message: err.message
      })
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
      return res.status(err.code || 500).json({
         success: false,
         message: err.message
      })
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
      return res.status(err.code || 500).json({
         success: false,
         message: err.message
      })
   }
}

/********************************************************
 * @getAllProducts
 * @Route GET http://localhost:5000/api/v1/products/all
 * @Description Retrieve All products, and then sends the resulting data back to the client as a JSON response.
 * @Parameters none
 * @Return Products Array
 *********************************************************/
module.exports.getAllProducts = async (_req, res) => {
   try {
      const products = await Product.find()
      return res.status(200).json({ success: true, products })

   } catch (err) {
      return res.status(err.code || 500).json({ success: false, message: err.message })
   }
}