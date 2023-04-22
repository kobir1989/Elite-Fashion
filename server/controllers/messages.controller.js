const Message = require("../models/messages.schama");
const errorResponse = require("../helper/errorResponse");
const CustomError = require("../helper/customError")

module.exports.addMessage = async (req, res) => {
  try {
    const { content, chatRoom, sender, receiver } = req.body;
    if (!content || !chatRoom || !sender || !receiver) {
      throw new CustomError(400, "All the feilds are mandatory", "message")
    };
    const message = await Message.create({
      content,
      chatRoom,
      sender,
      receiver
    })
    return res.status(201).json({ success: true, message })
  } catch (err) {
    errorResponse(res, err, "ADD-MESSAGE")
  }
}

module.exports.getMessages = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const messages = await Message.find({ chatRoom: chatRoomId })
    if (!messages) {
      throw new CustomError(404, "Messages not found!", "Message")
    };
    return res.status(200).json({ success: true, messages })
  } catch (err) {
    console.log(err)
    errorResponse(res, err, "GET-MESSAGES")
  }
} 