const express = require("express");

const router = express.Router();

const {
    sendOTP,
    verifyOTP,
    signup
} = require("./auth.controller");

const {
    validateSendOTP,
    validateVerifyOTP,
    validateSignup
} = require("./auth.validation");

// Send OTP
router.post("/send-otp",validateSendOTP,sendOTP);
// Verify OTP
router.post("/verify-otp",validateVerifyOTP,verifyOTP);
// Signup
router.post("/signup",validateSignup,signup);
module.exports = router;