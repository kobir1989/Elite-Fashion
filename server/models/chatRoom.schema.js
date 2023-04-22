const { Schema, model } = require("mongoose");

const chatRoomSchema = new Schema({
  participants: {
    type: Array,
    required: [true, "Participants are required!"]
  },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }]
},
  {
    timestamps: true
  }
);
chatRoomSchema.index({ updatedAt: -1 });
const ChatRoom = model("ChatRoom", chatRoomSchema);
module.exports = ChatRoom;