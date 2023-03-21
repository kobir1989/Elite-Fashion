//Socket io implimentation
const CustomError = require("./customError");

let io;

module.exports = {
   init: httpServer => {
      io = require("socket.io")(httpServer)
      return io
   },
   getIo: () => {
      if (!io) {
         throw new CustomError(404, "Socket.io is not initialized!")
      }
      return io;
   }
}