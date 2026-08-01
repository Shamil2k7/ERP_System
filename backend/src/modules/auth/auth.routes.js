const express = require("express");

const router = express.Router();

const {sendOTP,verifyOTP,signup} = require("./auth.controller");

const {validateSignup} = require("./auth.validation");

// Send OTP
router.post("/send-otp", sendOTP);

// Verify OTP
router.post("/verify-otp", verifyOTP);

// Signup
router.post(
    "/signup",
    validateSignup,
    signup
);
module.exports = router;