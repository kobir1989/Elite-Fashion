const route = require("express").Router();
const { getAllCategories, createCategory, editCategory, removeCategory, getSingleCategory } = require("../controllers/category.controller");

route.get("/categories/all", getAllCategories);
route.get("/categories/single", getSingleCategory);
route.post("/category/create/:adminId/:categoryId", createCategory);
route.post("/category/edit/:adminId/:categoryId", editCategory);
route.post("/category/remove/:adminId/:categoryId", removeCategory);

module.exports = route;
