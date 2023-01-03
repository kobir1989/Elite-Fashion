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

      app.on("err", (err) => {
         console.log(err, "Database Error");
         throw new err();
      });

      const onListining = () => {
         console.log(`Server is Up and Running on Port:${config.PORT}`);
      };
      app.listen(config.PORT, onListining);
   } catch (err) {
      console.log("connection failed");
      throw err;
   }
})();
