const Message = require('../models/messages.schama')
const ChatRoom = require('../models/chatRoom.schema')
const CustomError = require('../helper/customError')
const catchAsync = require('../utils/catchAsync')
const ApiFeatures = require('../service/apiFeatures')

/**********************************************************
Add a message to a chat room.
@route POST /api/v1/new/message/:chatRoomId
@param {string} chatRoomId.required - ID of the chat room to which the message belongs
@param {string} message.required - Message to be added
@param {string} sender.required - ID of the user sending the message
@param {string} receiver.required - ID of the user receiving the message
@returns {object} 201 - Success message and the new message object
@throws {CustomError} 400 - All the fields are mandatory
@throws {CustomError} 500 - Internal server error
***************************************************************/
module.exports.addMessage = catchAsync(async (req, res) => {
  const { chatRoomId } = req.params
  const { message, sender, receiver } = req.body
  if (!message || !chatRoomId || !sender || !receiver) {
    throw new CustomError('All the feilds are mandatory', 400)
  }
  const newMessage = await Message.create({
    message,
    chatRoom: chatRoomId,
    sender,
    receiver
  })
  await ChatRoom.updateOne(
    { _id: chatRoomId },
    { $push: { messages: newMessage._id } }
  )

  return res.status(201).json({
    status: 'success',
    result: 1,
    data: {
      newMessage
    }
  })
})

/*************************************************************************
 * Retrieves all messages for a given chat room.
 * @route GET /api/v1/messages/:chatRoomId
 * @param {string} chatRoomId - The ID of the chat room.
 * @returns {object} 200 - An object containing the messages for the chat room.
 * @throws {CustomError} 404 - Messages not found.
 * @throws {CustomError} 500 - Internal server error.
 *************************************************************************/
module.exports.getMessages = catchAsync(async (req, res) => {
  const chatApiFeatures = new ApiFeatures(req.query, Message.find())
    .filter()
    .limitFields()
    .populate({ path: 'sender', select: 'name email image' })

  const paginate = await chatApiFeatures.paginate()
  const messages = await chatApiFeatures.query

  if (!messages) {
    throw new CustomError(404, 'Messages not found!', 'Message')
  }
  return res.status(200).json({
    status: 'success',
    result: messages.length,
    ...paginate,
    data: {
      messages
    }
  })
})
