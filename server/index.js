const express = require("express");
const app = express();
const cors = require("cors")
const morgan = require("morgan")
const cookieParser = require("cookie-parser");

app.use(morgan("tiny"));
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", (req, res) => {
   res.status(200).json("ok")
})

module.exports = app;