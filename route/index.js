const express = require("express");
const router = express.Router();
const auth = require("./auth");
const category = require("./category");
const product = require("./product");

//localhost:3000/auth
router.use("/auth", auth);

//localhost:3000/category
router.use("/category", category);

//localhost:3000/product
router.use("/product", product);

module.exports = router;
