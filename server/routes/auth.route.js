const route = require("express").Router();
const { signUp, login, adminLogin } = require("../controllers/auth.controller");

route.post("/auth/signup", signUp);
route.post("/auth/login", login);
route.post("/admin/login", adminLogin);

module.exports = route;
