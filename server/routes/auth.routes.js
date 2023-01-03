const route = require("express").Router();
const { signUp, login } = require("../controllers/auth.controllers")


route.post("/auth/signup", signUp)

route.post("/auth/login", login)


module.exports = route;