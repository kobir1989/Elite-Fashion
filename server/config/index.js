const dotenv = require("dotenv")
dotenv.config()

const config = {
   PORT: process.env.PORT,
   DB_URL: process.env.DB_URL,
   JW_SECRET: process.env.JW_SECRET,
   JWT_EXPIRE: process.env.JWT_EXPIRE,
   SALT_ROUND: process.env.SALT_ROUND
}

module.exports = config;