const route = require("express").Router();
const { getAllProducts } = require("../controllers/product.controller")

route.get("/products/all", getAllProducts)

module.exports = route