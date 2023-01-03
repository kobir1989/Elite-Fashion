const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth.route");
const categoriesRoute = require("./routes/category.route");

app.use(morgan("tiny"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/v1", authRoute);
app.use("/api/v1", categoriesRoute);

module.exports = app;
