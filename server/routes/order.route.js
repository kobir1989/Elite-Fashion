const route = require("express").Router();
const {
   createNewOrder,
   getAllOrders,
   getOrderStatus,
   updateOrderStatus
} = require("../controllers/order.controller");

const {
   isAuthenticated,
} = require("../middlewares/authMiddleware");

const { updateStock } = require("../middlewares/updateStock.middleware")

route.get(
   "/order/all/:userId",
   isAuthenticated,
   getAllOrders
);

route.post(
   "/order/create/:userId",
   isAuthenticated,
   updateStock,
   createNewOrder
);

route.post(
   "/order/update/status/:userId/:orderId",
   isAuthenticated,
   updateOrderStatus
);

route.get(
   "/order/status/:userId",
   isAuthenticated,
   getOrderStatus
);

module.exports = route;