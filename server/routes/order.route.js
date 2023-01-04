const route = require("express").Router();
const {
   createNewOrder,
   getAllOrders,
   getOrderStatus,
   updateOrderStatus
} = require("../controllers/order.controller");

const { pushOrderToPurchaseList } = require("../middlewares/order.middleware");

const {
   isAuthenticated,
   isAdmin,
   isUser
} = requier("../middlewares/authMiddleware");

const { updateStock } = require("../middlewares/updateStock.middleware")

route.get(
   "/order/all/",
   isAuthenticated,
   getAllOrders
);

route.post(
   "/order/create/:userId",
   isAuthenticated,
   isUser,
   pushOrderToPurchaseList,
   updateStock,
   createNewOrder
);

route.post(
   "/order/update-status/:orderId/:userId",
   isAuthenticated,
   isAdmin,
   updateOrderStatus
);

route.get(
   "/order/status",
   isAuthenticated,
   getOrderStatus
);

module.exports = route;