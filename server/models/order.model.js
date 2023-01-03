const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
   product: {
      type: [
         {
            _id: {
               type: Schema.Types.ObjectId,
               ref: "Product",
               required: [true, "Product is required"]
            },
            quantity: {
               type: Number,
               required: [true, "Quantity is Required"],
            },
            price: {
               type: Number,
               required: [true, "Price is Required"]
            }
         },

      ]
   },
   transactionId: {
      type: String,
      required: [true, "Transaction Id is Required"]
   },
   totalAmount: {
      type: Number,
      required: [true, "Total Amount is Required"]
   },
   shippingAddress: {
      type: Array,
      required: [true, "Shipping address is Required"]
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is Required"]
   },
   phoneNumber: {
      type: String,
      required: [true, "Phone Number is Required"]
   },
   orderStatus: {
      type: String,
      enum: ["ORDERED", "SHIPPED", "DELIVERED", "CANCELED"],
      default: "ORDERED"
   }
},
   {
      timestamps: true
   }
);

const Order = model("Order", orderSchema);
module.exports = Order;