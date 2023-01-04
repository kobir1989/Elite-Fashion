const User = require("../models/user.schema")
module.exports.pushOrderToPurchaseList = async (req, res, next) => {
   try {
      const { userId } = req.params;
      const purchase = [];
      req.body.product.forEach((item) => {
         purchase.push({
            _id: item._id,
            quantity: item.quantity,
            price: item.price,
         });
      });
      await User.findByIdAndUpdate(
         {
            _id: userId,
         },
         { $push: { purchases: purchase } },
         { new: true },
      );

   } catch (err) {
      return res.status(err.code || 500).json({
         success: false,
         message: err.message,
      });
   }
   next();
};