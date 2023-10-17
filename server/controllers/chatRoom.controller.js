const ChatRoom = require('../models/chatRoom.schema')
const CustomError = require('../helper/customError')
const catchAsync = require('../utils/catchAsync')

/*********************************************************
Add a new chat room.
@route POST /api/v1/create/chat-room
@param {string} user.required - Id of the chat room user
@param {string} admin.required - Id of the chat room admin
@returns {object} 201 - Success message and chat room object
@throws {CustomError} 400 - Sender and Receiver Id are Required
@throws {CustomError} 500 - Internal server error
***************************************************************/
module.exports.addChatRoom = catchAsync(async (req, res) => {
  const { user, admin } = req.body
  if (!user || !admin) {
    throw new CustomError('Sender and Receiver Id are Required', 400)
  }
  const existingChatRoom = await ChatRoom.find({ user, admin })

  if (existingChatRoom.length > 0) {
    throw new CustomError('Room Already Exists!', 400)
  } else {
    const chatRoom = await ChatRoom.create({
      admin,
      user
    })
    return res.status(201).json({
      status: 'success',
      result: 1,
      data: {
        chatRoom
      }
    })
  }
})

/**********************************************************
Get all chat rooms.
@route GET /api/v1/chat-rooms/all
@returns {object} 200 - Success message and an array of chat room objects
@throws {CustomError} 400 - No Chat Room found!
@throws {CustomError} 500 - Internal server error
***************************************************************/
module.exports.getChatRooms = catchAsync(async (req, res) => {
  const chatRooms = await ChatRoom.find().populate({
    path: 'user',
    select: 'name email image messages'
  })
  if (!chatRooms) {
    throw new CustomError('No Chat Room found!', 400)
  }

  return res.status(200).json({
    status: 'success',
    result: 1,
    data: {
      chatRooms
    }
  })
})

/**********************************************************
Get chat room by user ID.
@route GET /api/v1/chat-room/:userId
@param {string} userId.required - ID of the user whose chat room is to be fetched
@returns {object} 200 - Chat room object
@throws {CustomError} 404 - Chat Room not found!
@throws {CustomError} 500 - Internal server error
***************************************************************/
module.exports.getChatRoomByUserId = catchAsync(async (req, res) => {
  const { userId } = req.params
  if (!userId) {
    throw new CustomError('Chat Room not found!', 404)
  }
  const chatRoom = await ChatRoom.find({ user: userId })
  res.status(200).json({
    status: 'success',
    result: chatRoom.length,
    data: {
      chatRoom
    }
  })
})
