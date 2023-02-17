const Order = require("../models/order.schema");
const CustomError = require("../helper/customError");
const errorResponse = require("../helper/errorResponse");
const User = require("../models/user.schema");
const mailSender = require("../helper/mailSender");
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
      if (!checkout.address || !checkout.phone || !checkout.city || !checkout.order) {
         throw new CustomError(400, "All the feilds are mendetory", "Order Validation Error");
      };
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

      //Email Body text
      const text = `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; font-family: Arial, sans-serif;">
      <div style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
      <h1 style="text-align: center; margin-bottom: 30px; color: #d89b9b;">Thank You for Shopping with Elite Fashion!</h1>
      <p style="font-size: 18px;">Dear ${req?.user?.name},</p>
      <p style="font-size: 18px;">We wanted to take a moment to thank you for your recent purchase with Elite Fashion. We appreciate doing business with you and we hope that you are happy with your order.</p>
      <p style="font-size: 18px;">If you have any questions or concerns about your purchase, please don't hesitate to contact us at support@elitefashion.com.</p>
      <p style="font-size: 18px;">Thank you again for shopping with us. We hope to see you again soon!</p>
      </div>
      </div>`
      //Email sender helper function, if order successfull user will get an email.   
      await mailSender(req?.user?.email, text, "Thank You for Shopping with Elite Fashion")

      return res.status(200).json({ success: true, message: "Order Submit successfully" })

   } catch (err) {
      errorResponse(res, err, "CREATE-ORDER");
   };
};

/********************************************************
 * @getAllOrders
 * @Route GET http://localhost:5000/api/v1/order/all
 * @Description admin can see all order.
 * @Parameters  none
 * @Return order object
 *********************************************************/
module.exports.getAllOrders = async (req, res) => {
   try {
      //only ADMIN has access.
      if (req.user.role !== "ADMIN") {
         throw new CustomError(401, "Access denied. You are not authorized to access this resource.");
      };
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
 * @getSingleOrder
 * @Route GET http://localhost:5000/api/v1/order/single/:orderId
 * @Description admin can see all order.
 * @Parameters  orderId from req.params
 * @Return order object
 *********************************************************/
module.exports.getSingleOrder = async (req, res) => {
   try {
      const { orderId } = req.params;
      //only ADMIN has access.
      if (req.user.role !== "ADMIN") {
         throw new CustomError(401, "Access denied. You are not authorized to access this resource.");
      };
      const order = await Order.findOne({ _id: orderId }).populate({
         path: "product._id",
         model: "Product",
         select: "title price image _id",
      });
      if (!order) {
         throw new CustomError(400, "No order found")
      }
      return res.status(200).json({ success: true, order })

   } catch (err) {
      errorResponse(res, err, "GET-ALL-ORDER");
   }
}

/********************************************************
 * @updateOrderStatus
 * @Route POST http://localhost:5000/api/v1/order/update-status/:orderId/:userId
 * @Description only Admin can update order status
 * @Parameters orderId, status
 * @Return success message
 *********************************************************/
module.exports.updateOrderStatus = async (req, res) => {
   try {
      //only ADMIN has access.
      console.log(req.body, "BODYU")
      if (req.user.role !== "ADMIN") {
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


// /**********************Currently Not using**********************************
//  * @getOrderStatus
//  * @Route GET http://localhost:5000/api/v1/order/status
//  * @Description user and admin can check order status.
//  * @Parameters  none
//  * @Return status
//  *********************************************************/
// module.exports.getOrderStatus = async (req, res) => {
//    try {
//       //only ADMIN has access.
//       if (req.user.role !== "ADMIN") {
//          throw new CustomError(401, "Access denied. You are not authorized to access this resource.");
//       };
//       return res.json(Order.schema.path("orderStatus").enumValues);
//    } catch (err) {
//       errorResponse(res, err, "ORDER-STATUS");
//    };
// }

