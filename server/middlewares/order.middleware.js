
module.exports.pushOrderToPurchaseList = async (req, _res, next) => {
   const { userId } = req.params;
   const purchase = [];
   req.body.products.forEach((item) => {
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
   next();
};