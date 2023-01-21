const Order = require("../models/order.schema");
const CustomError = require("../helper/customError");
const errorResponse = require("../helper/errorResponse");
const User = require("../models/user.schema");

/********************************************************
 * @createNewOrder
 * @Route POST http://localhost:5000/api/v1/order/create/:userId
 * @Description Post new oreder, only user can post order,
 * @Parameters  product, transactionId, totalAmount, shippingAddress, city, phoneNumber,
 * @Return success message
 *********************************************************/
module.exports.createNewOrder = async (req, res) => {
   try {
      const { checkout } = req.body;
      const { userId } = req.params
      console.log(checkout, "ORDER")
      if (!checkout.address || !checkout.phone || !checkout.city || !checkout.order) {
         throw new CustomError(400, "All the feilds are mendetory", "Order Validation Error");
      };
      console.log(checkout.paymentId, "PAYMENT_ID")
      const order = await Order.create({
         product: checkout.order,
         city: checkout.city,
         shippingAddress: checkout.address,
         user: userId,
         phoneNumber: checkout.phone,
         paymentId: checkout.paymentId,
      });

      //User purchases Array will be updated after create new order.
      await User.findByIdAndUpdate({
         _id: userId,
      },
         { $push: { purchases: order } },
         { new: true })

      console.log(order)
      return res.status(200).json({ success: true, message: "Order created successfully" })

   } catch (err) {
      errorResponse(res, err, "CREATE-ORDER");
   };
};

/********************************************************
 * @getAllOrders
 * @Route GET http://localhost:5000/api/v1/order/all
 * @Description user and admin can see all order.
 * @Parameters  none
 * @Return order object
 *********************************************************/
module.exports.getAllOrders = async (_req, res) => {
   try {
      const order = await Order.find().populate("user", "_id name");
      if (!order) {
         throw new CustomError(400, "No order found")
      }
      return res.status(200).json({ success: true, order })

   } catch (err) {
      errorResponse(res, err, "GET-ALL-ORDER");
   }
}

/********************************************************
 * @getOrderStatus
 * @Route GET http://localhost:5000/api/v1/order/status
 * @Description user and admin can check order status.
 * @Parameters  none
 * @Return status
 *********************************************************/
module.exports.getOrderStatus = async (_req, res) => {
   try {

      return res.json(Order.schema.path("orderStatus").enumValues);
   } catch (err) {
      errorResponse(res, err, "ORDER-STATUS");
   };
}

/********************************************************
 * @updateOrderStatus
 * @Route POST http://localhost:5000/api/v1/order/update-status/:orderId/:userId
 * @Description only Admin can update order status
 * @Parameters orderId, status
 * @Return success message
 *********************************************************/
module.exports.updateOrderStatus = async (req, res) => {
   console.log(req.body)
   try {
      //only ADMIN has access.
      if (req.role !== "ADMIN") {
         throw new CustomError(401, "Access denied. You are not authorized to access this resource.");
      };
      const { orderId } = req.params;
      const { orderStatus } = req.body;
      await Order.findByIdAndUpdate(
         { _id: orderId },
         {
            orderStatus
         },
         { new: true, runValidators: true }
      );

      return res.status(200).json({
         success: true,
         message: "Order status updated successfully"
      })
   } catch (err) {
      errorResponse(res, err, "UPDATE-ORDER-STATUS")
   };
};
