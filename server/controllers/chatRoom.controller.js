const ChatRoom = require("../models/chatRoom.schema");
const CustomError = require("../helper/customError");
const errorResponse = require("../helper/errorResponse");

module.exports.addChatRoom = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    if (!senderId || !receiverId) {
      throw new CustomError(400, "Sender and Receiver Id are Required")
    };
    const chatRoom = await ChatRoom.create({
      participants: [senderId, receiverId]
    });
    return res.status(201).json({ sussess: true, chatRoom })
  } catch (err) {
    errorResponse(res, err, "ADD-CHAT-ROOM")
  }
}

module.exports.getChatRooms = async (req, res) => {
  try {
    const chatRooms = await ChatRoom.find();
    if (!chatRooms) {
      throw new CustomError(400, "No Chat Room found!")
    };
    return res.status(200).json({ success: true, chatRooms })
  } catch (err) {
    errorResponse(res, err, "GET-CHAT-ROOMS")
  }
}