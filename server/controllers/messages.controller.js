const Message = require("../models/messages.schama");
const ChatRoom = require("../models/chatRoom.schema")
const errorResponse = require("../helper/errorResponse");
const CustomError = require("../helper/customError");

module.exports.addMessage = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const { message, sender, receiver } = req.body;
    if (!message || !chatRoomId || !sender || !receiver) {
      throw new CustomError(400, "All the feilds are mandatory", "message")
    };
    const newMessage = await Message.create({
      message,
      chatRoom: chatRoomId,
      sender,
      receiver
    })
    await ChatRoom.updateOne(
      { _id: chatRoomId },
      { $push: { messages: newMessage._id } }
    );
    return res.status(201).json({ success: true, newMessage })
  } catch (err) {
    errorResponse(res, err, "ADD-MESSAGE")
  }
}

module.exports.getMessages = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const messages = await Message.find({ chatRoom: chatRoomId }).populate({
      path: 'sender',
      select: 'name email image'
    })
    if (!messages) {
      throw new CustomError(404, "Messages not found!", "Message")
    };
    return res.status(200).json({ success: true, messages })
  } catch (err) {
    errorResponse(res, err, "GET-MESSAGES")
  }
} 