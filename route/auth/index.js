const express = require("express");
const {
  SignupController,
  LoginController,
  VerifyOtpController,
} = require("../../controllers/authController");
const router = express.Router();

//localhost:3000/auth/signup
router.post("/signup", SignupController);

//localhost:3000/auth/login
router.post("/login", LoginController);

//localhost:3000/auth/verifyotp
router.post("/verifyotp", VerifyOtpController);

module.exports = router;
