import bcrypt from "bcrypt";
import crypto from "crypto";

import { sendOTPEmail } from "../../config/mail.js";
import { generateToken } from "../../config/jwt.js";

import {
  findUserByLogin,
  findUserByEmail,
  saveOTP,
  findOTPByEmail,
  markOTPAsUsed,
  updatePassword,
} from "./auth.repository.js";

// Login
const loginService = async (login, password) => {
  const employee = await findUserByLogin(login);

  if (!employee) {
    throw new Error("Employee not found");
  }

  const passwordMatched = await bcrypt.compare(
    password,
    employee.passwordHash
  );

  if (!passwordMatched) {
    throw new Error("Invalid password");
  }

  if (!employee.isVerified) {
    throw new Error("Please verify your email first");
  }

  const token = generateToken(employee.id);

  return {
    success: true,
    message: "Login successful",
    token,
    user: {
      id: employee.id,
      fullName: employee.fullName,
      email: employee.email,
      employeeId: employee.employeeId,
      phone: employee.phone,
      role: employee.role?.name,
    },
  };
};

// Change Password
const changePasswordService = async (
  email,
  currentPassword,
  newPassword
) => {
  const employee = await findUserByEmail(email);

  if (!employee) {
    throw new Error("Employee not found");
  }

  const passwordMatched = await bcrypt.compare(
    currentPassword,
    employee.passwordHash
  );

  if (!passwordMatched) {
    throw new Error("Current password is incorrect");
  }

  const passwordHash = await bcrypt.hash(
    newPassword,
    10
  );

  await updatePassword(email, passwordHash);

  return {
    success: true,
    message: "Password changed successfully",
  };
};

// Forgot Password
const forgotPasswordService = async (email) => {
  const employee = await findUserByEmail(email);

  if (!employee) {
    throw new Error("Employee not found");
  }

  const otp = crypto.randomInt(100000, 999999).toString();

  const expiresAt = new Date(
    Date.now() + 5 * 60 * 1000
  );

  await saveOTP({
    email,
    otp,
    expiresAt,
  });

  await sendOTPEmail(email, otp);

  return {
    success: true,
    message: "OTP sent successfully",
  };
};

// Verify Reset OTP
const verifyResetOTPService = async (email, otp) => {
  const savedOTP = await findOTPByEmail(email);

  if (!savedOTP) {
    throw new Error("OTP not found");
  }

  if (savedOTP.isUsed) {
    throw new Error("OTP already used");
  }

  if (savedOTP.expiresAt < new Date()) {
    throw new Error("OTP expired");
  }

  if (savedOTP.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  await markOTPAsUsed(savedOTP.id);

  return {
    success: true,
    message: "OTP verified successfully",
  };
};

// Reset Password
const resetPasswordService = async (
  email,
  password
) => {
  const employee = await findUserByEmail(email);

  if (!employee) {
    throw new Error("Employee not found");
  }

  const passwordHash = await bcrypt.hash(
    password,
    10
  );

  await updatePassword(email, passwordHash);

  return {
    success: true,
    message: "Password reset successfully",
  };
};

export {
  loginService,
  changePasswordService,
  forgotPasswordService,
  verifyResetOTPService,
  resetPasswordService,
};