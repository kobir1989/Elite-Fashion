const route = require("express").Router();
const { addChatRoom, getChatRooms, getChatRoomByUserId } = require("../controllers/chatRoom.controller");

route.get("/chat-rooms/all", getChatRooms);
route.get("/chat-room/:userId", getChatRoomByUserId);

route.post("/create/chat-room", addChatRoom);

module.exports = route;