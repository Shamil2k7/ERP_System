import express from "express";

const router = express.Router();

import {
    sendOTP,
    verifyOTP,
    signup
} from "./auth.controller.js";

import {
    validateSendOTP,
    validateVerifyOTP,
    validateSignup
} from "./auth.validation.js";

// Send OTP
router.post("/send-otp",validateSendOTP,sendOTP);
// Verify OTP
router.post("/verify-otp",validateVerifyOTP,verifyOTP);
// Signup
router.post("/signup",validateSignup,signup);
export default router;