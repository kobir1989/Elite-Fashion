const route = require("express").Router();
const { addChatRoom, getChatRooms } = require("../controllers/chatRoom.controller");

route.get("/chatRooms/all", getChatRooms);

route.post("/create/chat-room", addChatRoom);

module.exports = route;