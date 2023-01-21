const CustomError = require("../helper/customError");
const Product = require("../models/product.schema");
const errorResponse = require("../helper/errorResponse");

/********************************************************
 * @updateStock Middleware
 * @Description This middleware is used to reduce product stock quantity, so that client can validate if the product is in stock or not.
 * @Parameters
 *   -checkout object from req.body
 
 *********************************************************/
module.exports.updateStock = (req, res, next) => {
   // console.log(req.body.product)
   const { checkout } = req.body;
   try {
      const updateOperations = checkout.order.map((product) => {
         return {
            updateOne: {
               filter: { _id: product._id },
               update: { $inc: { "stock": - product.quantity, "sold": + product.quantity } },
            },
         };
      });
      Product.bulkWrite(updateOperations, (err, _products) => {
         if (err) {
            throw new CustomError(400, "Bulk Oparation failed", "Update stock middleware");
         }
         next();
      });

   } catch (err) {
      errorResponse(err, res, "UPDATE-STOCk MIDDLEWARE")
   };
};
