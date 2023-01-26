const route = require("express").Router();
const { signUp, login, logout } = require("../controllers/auth.controller");

route.post("/auth/signup", signUp);
route.post("/auth/login", login);

module.exports = route;
