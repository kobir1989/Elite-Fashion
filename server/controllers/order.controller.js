const Order = require("../models/order.schema");
const CustomError = require("../helper/customError");


/********************************************************
 * @createNewOrder
 * @Route POST http://localhost:5000/api/v1/order/create/:userId
 * @Description Post new oreder, only user can post order,
 * @Parameters  product, transactionId, totalAmount, shippingAddress, phoneNumber,
 * @Return order object
 *********************************************************/
module.exports.createNewOrder = async (req, res, next) => {
   try {
      const { userId } = req.params;
      const {
         product,
         transactionId,
         totalAmount,
         shippingAddress,
         phoneNumber,
      } = req.body;
      if (!product || !transactionId || !totalAmount || !shippingAddress || !phoneNumber) {
         throw new CustomError(400, "All the feilds are mendetory");
      };

      const order = await Order.create({
         product,
         transactionId,
         totalAmount,
         shippingAddress,
         user: userId,
         phoneNumber,
      })
      transactionId = undefined;
      userId = undefined;
      return res.status(200).json({ success: true, order })

   } catch (err) {
      return res.status(err.code || 500).json({
         success: false,
         message: err.message
      });
   };
};

/********************************************************
 * @getAllOrders
 * @Route GET http://localhost:5000/api/v1/order/all
 * @Description user and admin can see all order.
 * @Parameters  none
 * @Return order object
 *********************************************************/
module.exports.getAllOrders = async (req, res) => {
   try {
      const order = await Order.find().populate("user", "_id name");
      if (!order) {
         throw new CustomError(400, "No order found")
      }
      return res.status(200).json({ success: true, order })

   } catch (err) {
      return res.status(err.code || 500).json({
         success: false,
         message: err.message
      });
   }
}

/********************************************************
 * @getOrderStatus
 * @Route GET http://localhost:5000/api/v1/order/status
 * @Description user and admin can check order status.
 * @Parameters  none
 * @Return status
 *********************************************************/
module.exports.getOrderStatus = async (req, res) => {
   try {
      return res.json(Order.schema.path("status").enumValues)
   } catch (err) {
      return res.status(err.code || 500).json({
         success: false,
         message: err.message
      });
   }

}

/********************************************************
 * @updateOrderStatus
 * @Route POST http://localhost:5000/api/v1/order/update-status/:orderId/:userId
 * @Description only user can update order status
 * @Parameters orderId, status
 * @Return success message
 *********************************************************/
module.exports.updateOrderStatus = async (req, res) => {
   try {
      const { orderId, status } = req.body;
      const order = await Order.findById({ _id: orderId });
      if (!order) {
         throw new CustomError("No order found with this id", 400)
      }
      order.status = status;
      await order.save()
      res.status(200).json({ success: true, message: "Order status updated successfully" })
   } catch (err) {
      return res.status(err.code || 500).json({
         success: false,
         message: err.message
      });
   };

};
