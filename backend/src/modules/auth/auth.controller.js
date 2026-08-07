import {
  loginService,
  changePasswordService,
  forgotPasswordService,
  verifyResetOTPService,
  resetPasswordService,
} from "./auth.service.js";

// Login
const login = async (req, res) => {
  try {
    const { login, password } = req.body;

    const result = await loginService(login, password);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// Change Password
const changePassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    const result = await changePasswordService(
      email,
      currentPassword,
      newPassword
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await forgotPasswordService(email);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify Reset OTP
const verifyResetOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const result = await verifyResetOTPService(email, otp);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await resetPasswordService(email, password);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  login,
  changePassword,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
};