const express = require("express");
const router = express.Router();

//localhost:3000/auth/signup
router.post("/signup", (req, res) => {
  res.send("signup");
});

//localhost:3000/auth/alluser
router.get("/alluser", (req, res) => {
  res.send("alluser");
});

module.exports = router;
