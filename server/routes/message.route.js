const route = require("express").Router();
const { addMessage, getMessages } = require("../controllers/messages.controller");

//Add new Chat message route
route.post("/new/message/:chatRoomId", addMessage);
route.get("/messages/:chatRoomId", getMessages)

module.exports = route;