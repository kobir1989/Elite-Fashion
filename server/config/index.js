const dotenv = require("dotenv")
dotenv.config()

const config = {
   PORT: process.env.PORT,
   DB_URL: process.env.DB_URL,
   JWT_SECRET: process.env.JWT_SECRET,
   JWT_EXPIRE: process.env.JWT_EXPIRE,
   SALT_ROUND: parseInt(process.env.SALT_ROUND),
   CLOUD_NAME: process.env.CLOUD_NAME,
   CLOUD_API_KEY: process.env.CLOUD_API_KEY,
   CLOUD_SECRET: process.env.CLOUD_SECRET,
   SEND_GRID_EMIL_API: process.env.SEND_GRID_EMIL_API
}

module.exports = config;