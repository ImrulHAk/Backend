const express = require("express");
const router = express.Router();
const auth = require("./auth");
const category = require("./category");

//localhost:3000/auth
router.use("/auth", auth);

//localhost:3000/category
router.use("/category", category);

module.exports = router;
