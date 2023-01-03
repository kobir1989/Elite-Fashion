const route = require("express").Router();
const { getAllCategories } = require("../controllers/category.controller");

route.get("/categories/all", getAllCategories);

module.exports = route;
