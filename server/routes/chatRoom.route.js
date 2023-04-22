const route = require("express").Router();
const { addChatRoom, getChatRooms, getChatRoomByUserId } = require("../controllers/chatRoom.controller");

route.get("/chatRooms/all", getChatRooms);
route.get("/chatRoom/:userId", getChatRoomByUserId);

route.post("/create/chat-room", addChatRoom);

module.exports = route;