const { sendEmail } = require("../helpers/sendEmail");
const userModel = require("../models/userModel");
const otpGenerator = require("otp-generator");

async function SignupController(req, res) {
  const { name, email, phone, password, role } = req.body;
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  try {
    const olduseremail = await userModel.findOne({ email });

    if (!olduseremail) {
      const user = new userModel({
        name,
        email,
        phone,
        password,
        role,
      });
      await user.save();
      sendEmail(email, otp);
      user.otp = otp;
      await user.save();
      res
        .status(201)
        .json({ msg: "signup successful", success: true, data: user });
    } else {
      res
        .status(500)
        .send({ success: false, msg: " You have already use this email" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ err: error.message ? error.message : error, success: false });
  }
}

function LoginController(req, res) {
  res.send("login");
}

module.exports = { SignupController, LoginController };
