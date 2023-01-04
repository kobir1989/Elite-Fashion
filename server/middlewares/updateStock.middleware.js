module.exports.updateStock = (req, res, next) => {
   try {
      const updateOperations = req.body.products.map((product) => {
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
