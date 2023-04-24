const config = require("./config/index");
const app = require("./index");
const mongoose = require("mongoose");

(async () => {
   try {
      await mongoose.connect(config.DB_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      console.log("Database Connected Successfully");

      app.on("error", (error) => {
         console.log(error, "Database Error");
         throw error;
      });

      const onListining = () => {
         console.log(`Server is Up and Running on Port:${config.PORT}`);
      };
      const server = app.listen(config.PORT, onListining);

      //Socket.io
      const io = require("./helper/socket").init(server, {
         cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type'],
         }
      });
      io.on("connection", socket => {
         console.log(`User ${socket.id} connected`);

         // Listen for disconnections
         socket.on('disconnect', () => {
            console.log(`User ${socket.id} disconnected`);
         });
      });

   } catch (error) {
      console.log("connection failed");
      throw error;
   }
})();
