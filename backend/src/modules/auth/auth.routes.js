import express from "express";

import {
  login,
  verifyEmail,
  changePassword,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
} from "./auth.controller.js";

import {
  validateLogin,
  validateChangePassword,
  validateForgotPassword,
  validateResetOTP,
  validateResetPassword,
} from "./auth.validation.js";

const router = express.Router();

console.log("✅ Auth Routes Loaded");

// Test Route
router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Auth Route Working",
  });
});

// Verify Email
router.get("/verify-email", verifyEmail);

// Login
router.post(
  "/login",
  validateLogin,
  login
);

// Change Password
router.post(
  "/change-password",
  validateChangePassword,
  changePassword
);

// Forgot Password
router.post(
  "/forgot-password",
  validateForgotPassword,
  forgotPassword
);

// Verify Reset OTP
router.post(
  "/verify-reset-otp",
  validateResetOTP,
  verifyResetOTP
);

// Reset Password
router.post(
  "/reset-password",
  validateResetPassword,
  resetPassword
);

export default router;