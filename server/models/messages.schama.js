const { model, Schema } = require("mongoose");

const messagesSchame = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  chatRoom: {
    type: Schema.Types.ObjectId,
    ref: "ChatRoom",
  },
  content: {
    type: String,
    required: [true, "Message are reqired!"],
    trim: true
  }
},
  {
    timestamps: true
  }
);

const Message = model("Message", messagesSchame);
module.exports = Message;