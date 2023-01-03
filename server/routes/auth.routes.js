const route = require("express").Router();
const { signUp, login, logout } = require("../controllers/auth.controllers");

route.post("/auth/signup", signUp);
route.post("/auth/login", login);
route.get("/auth/logout", logout);

module.exports = route;
