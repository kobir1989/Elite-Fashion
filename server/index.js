const express = require("express");
const app = express();
const cors = require("cors")
const morgan = require("morgan")
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes")

app.use(morgan("tiny"));
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.use("/api/v1", authRoutes)

module.exports = app;