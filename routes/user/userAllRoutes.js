const express = require("express");
const route = express.Router();
const userController = require("../../controllers/userController")
const userRegisterController = require("../../controllers/userRegisterController")
const userLoginController = require("../../controllers/userLoginController")
const cartController = require("../../controllers/cartController")
const productController = require("../../controllers/productController")
const auth = require('../../controllers/auth.js')
const confirmOrder = require('../../controllers/confirmOrder.js')


route.get("/", userController().index)
route.get("/about", userController().about)
route.get("/contact", userController().contact)

route.get("/product", productController().getAllProducts)
route.get("/cart", auth, cartController().getAllProducts)
route.get("/sign-up", userController().registerLogin)
route.get("/orderConfirm", userController().orderConfirm)
route.get("/product/:pid", auth, cartController().addProduct)
route.get("/cart/delete/:cpid", auth, cartController().deleteProductFromCart)



route.post("/register", userRegisterController);
route.post("/login", userLoginController);
route.post("/order-form",auth, userController().orderForm)
route.post("/confirmOrder", auth, confirmOrder)
module.exports = route;