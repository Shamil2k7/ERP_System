import express from "express";

import {
  addEmployee,
  verifyEmail,
  login,
  changePassword,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
} from "./auth.controller.js";

import {
  validateAddEmployee,
  validateLogin,
  validateChangePassword,
  validateForgotPassword,
  validateResetOTP,
  validateResetPassword,
} from "./auth.validation.js";

const router = express.Router();

console.log("✅ Auth Routes Loaded");

router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Auth Route Working",
  });
});
router.post(
  "/employees",
  validateAddEmployee,
  addEmployee
);
router.get(
  "/verify-email",
  verifyEmail
);
router.post(
  "/login",
  validateLogin,
  login
);
router.post(
  "/change-password",
  validateChangePassword,
  changePassword
);
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