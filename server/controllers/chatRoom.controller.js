const ChatRoom = require("../models/chatRoom.schema");
const CustomError = require("../helper/customError");
const errorResponse = require("../helper/errorResponse");

module.exports.addChatRoom = async (req, res) => {
  try {
    const { user, admin } = req.body;
    if (!user || !admin) {
      throw new CustomError(400, "Sender and Receiver Id are Required")
    };
    const existingChatRoom = await ChatRoom.find({ user, admin })

    if (existingChatRoom.length > 0) {
      return res.status(200).json('ChatRoom already exists!')
    } else {
      const chatRoom = await ChatRoom.create({
        admin,
        user
      });
      return res.status(201).json({ sussess: true, chatRoom })
    }

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

module.exports.getChatRoomByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw new CustomError(404, 'Chat Room not found!')
    }
    const chatRoom = await ChatRoom.find({ user: userId })
    res.status(200).json(chatRoom)
  } catch (err) {
    errorResponse(res, err, 'GET-CHAT-ROOM-BY-ID')
  }
}