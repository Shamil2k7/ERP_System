import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendOTPEmail } from "../../config/mail.js";
import { generateToken } from "../../config/jwt.js";

import {
  findUserByEmail,
  findUserByLogin,
  createUser,
  saveOTP,
  findOTPByEmail,
  markOTPAsUsed,
  findVerifiedOTP,
  findRoleByName,
  updatePassword,
} from "./auth.repository.js";
// SEND OTP (Signup)
const sendOTPService = async (email) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already registered");
  }
  const otp = crypto.randomInt(100000, 999999).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
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
// VERIFY OTP
const verifyOTPService = async (email, otp) => {
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
// SIGNUP
const signupService = async (userData) => {
  const existingUser = await findUserByEmail(userData.email);
  if (existingUser) {
    throw new Error("Email already registered");
  }
  const verifiedOTP = await findVerifiedOTP(userData.email);
  if (!verifiedOTP) {
    throw new Error("Please verify your email first");
  }
  const passwordHash = await bcrypt.hash(userData.password, 10);
  let roleId = userData.roleId;
  if (!roleId) {
    const employeeRole = await findRoleByName("Employee");
    if (!employeeRole) {
      throw new Error("Employee role not found");
    }
    roleId = employeeRole.id;
  }
  const user = await createUser({
    fullName: userData.fullName || "Employee",
    email: userData.email,
    employeeId: userData.employeeId,
    phone: userData.phone,
    passwordHash,
    roleId,
  });

  return {
    success: true,
    message: "User registered successfully",
    user,
  };
};
// LOGIN
const loginService = async (login, password) => {
  const user = await findUserByLogin(login);
  if (!user) {
    throw new Error("User not found");
  }
  const match = await bcrypt.compare(
    password,
    user.passwordHash
  );
  if (!match) {
    throw new Error("Invalid password");
  }
  if (!user.isVerified) {
    throw new Error("Please verify your email first");
  }
  const token = generateToken(user.id);
  return {
    success: true,
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      employeeId: user.employeeId,
      phone: user.phone,
      role: user.role?.name || null,
    },
  };
};
// FORGOT PASSWORD
const forgotPasswordService = async (email) => {

  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Email not found");
  }

  const otp = crypto.randomInt(100000, 999999).toString();

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await saveOTP({
    email,
    otp,
    expiresAt,
  });

  await sendOTPEmail(email, otp);

  return {
    success: true,
    message: "Reset OTP sent successfully",
  };
};
// VERIFY RESET OTP
const verifyResetOTPService = async (email, otp) => {

  const savedOTP = await findOTPByEmail(email);

  if (!savedOTP) {
    throw new Error("OTP not found");
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
    message: "OTP verified",
  };
};
// RESET PASSWORD
const resetPasswordService = async (
  email,
  password
) => {

  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await updatePassword(email, passwordHash);

  return {
    success: true,
    message: "Password reset successfully",
  };
};


export {
  sendOTPService,
  verifyOTPService,
  signupService,
  loginService,
  forgotPasswordService,
  verifyResetOTPService,
  resetPasswordService,
};