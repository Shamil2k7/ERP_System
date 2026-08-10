import {
  loginSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  verifyResetOTPSchema,
  resetPasswordSchema,
} from "./auth.schema.js";

// Login
const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

// Change Password
const validateChangePassword = (req, res, next) => {
  const { error } = changePasswordSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

// Forgot Password
const validateForgotPassword = (req, res, next) => {
  const { error } = forgotPasswordSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

// Verify Reset OTP
const validateResetOTP = (req, res, next) => {
  const { error } = verifyResetOTPSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

// Reset Password
const validateResetPassword = (req, res, next) => {
  const { error } = resetPasswordSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};

export {
  validateLogin,
  validateChangePassword,
  validateForgotPassword,
  validateResetOTP,
  validateResetPassword,
};