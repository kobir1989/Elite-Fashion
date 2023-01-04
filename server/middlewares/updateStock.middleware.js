const CustomError = require("../helper/customError");
const Product = require("../models/product.schema");

module.exports.updateStock = (req, res, next) => {
   // console.log(req.body.product)
   try {
      const updateOperations = req.body.product.map((product) => {
         return {
            updateOne: {
               filter: { _id: product._id },
               update: { $inc: { "stock": - product.quantity, "sold": + product.quantity } },
            },
         };
      });
      Product.bulkWrite(updateOperations, (err, _products) => {
         if (err) {
            throw new CustomError("Bulk Oparation failed", 400);
         }
         next();
      });

   } catch (err) {
      return res.status(err.code || 500).json({
         success: false,
         message: err.messaage
      });
   };
};
