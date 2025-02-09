const express = require("express");
const router = express.Router();
const auth = require("./auth");

//localhost:3000/auth
router.use("/auth", auth);

module.exports = router;
