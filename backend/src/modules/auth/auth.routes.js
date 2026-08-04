import express from "express";

const router = express.Router();

import {
    sendOTP,
    verifyOTP,
    signup,
    login,
    forgotPassword,
    verifyResetOTP,
    resetPassword
} from "./auth.controller.js";

import {
    validateSendOTP,
    validateVerifyOTP,
    validateSignup,
    validateLogin,
    validateForgotPassword,
    validateResetOTP,
    validateResetPassword
} from "./auth.validation.js";

// Signup Routes
router.post("/send-otp", validateSendOTP, sendOTP);

router.post("/verify-otp", validateVerifyOTP, verifyOTP);

router.post("/signup", validateSignup, signup);
// Login Route
router.post("/login", validateLogin, login);


// Forgot Password Routes

router.post(
    "/forgot-password",
    validateForgotPassword,
    forgotPassword
);

router.post(
    "/verify-reset-otp",
    validateResetOTP,
    verifyResetOTP
);

router.post(
    "/reset-password",
    validateResetPassword,
    resetPassword
);

export default router;