const express = require("express");
const route = express.Router();
const userController = require("../../controllers/userController")
const userRegisterController = require("../../controllers/userRegisterController")
const userLoginController = require("../../controllers/userLoginController")
const cartController = require("../../controllers/cartController")

route.get("/", userController().index)
route.get("/about", userController().about)
route.get("/contact", userController().contact)
route.get("/product", userController().product)
route.get("/cart", userController().cart)
route.get("/sign-up", userController().registerLogin)
route.get("/addToCart/:pid", cartController().addProduct)



route.post("/register", userRegisterController);
route.post("/login", userLoginController);
module.exports = route;