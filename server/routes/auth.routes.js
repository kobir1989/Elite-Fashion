const route = require("express").Router();
const { signUp } = require("../controllers/auth.controllers")


route.post("/auth/signup", signUp)

route.post("/auth/login", (req, res) => {
   res.status(200).json("LOGIN")
})


module.exports = route;