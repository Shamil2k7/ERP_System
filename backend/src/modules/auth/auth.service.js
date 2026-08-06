import bcrypt from "bcrypt";
import crypto from "crypto";

import { sendVerificationEmail, sendOTPEmail } from "../../config/mail.js";
import { generateToken } from "../../config/jwt.js";

import {
  findUserByEmail,
  findUserByEmployeeId,
  findUserByLogin,
  findRoleByName,
  createEmployee,
  findUserByVerificationToken,
  verifyEmployee,
  saveOTP,
  findOTPByEmail,
  markOTPAsUsed,
  updatePassword,
} from "./auth.repository.js";

const addEmployeeService = async (userData) => {

  const emailExists = await findUserByEmail(userData.email);

  if (emailExists) {
    throw new Error("Email already exists");
  }
  const employeeExists = await findUserByEmployeeId(
    userData.employeeId
  );

  if (employeeExists) {
    throw new Error("Employee ID already exists");
  }
  const role = await findRoleByName(userData.role);

  if (!role) {
    throw new Error("Role not found");
  }
  const passwordHash = await bcrypt.hash(
    userData.password,
    10
  );
  const verificationToken = crypto.randomUUID();

  const verificationExpires = new Date(
    Date.now() + 30 * 60 * 1000
  );
  const employee = await createEmployee({
    fullName: userData.fullName,
    email: userData.email,
    employeeId: userData.employeeId,
    phone: userData.phone,
    passwordHash,
    roleId: role.id,
    verificationToken,
    verificationExpires,
  });
  await sendVerificationEmail(
    employee.email,
    verificationToken
  );
  return {
    success: true,
    message:
      "Employee created successfully. Verification email sent.",
    employee,
  };
};
const verifyEmailService = async (token) => {

  const employee = await findUserByVerificationToken(token);

  if (!employee) {
    throw new Error("Invalid verification link");
  }
  if (employee.verificationExpires < new Date()) {
    throw new Error("Verification link expired");
  }
  if (employee.isVerified) {
    throw new Error("Email already verified");
  }

  await verifyEmployee(employee.id);

  return {
    success: true,
    message: "Email verified successfully",
  };
};
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

  if (employee.firstLogin) {

    return {
      success: true,
      message: "Please change your password",

      firstLogin: true,

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
  }

  // 6. Normal Login
  return {
    success: true,
    message: "Login successful",

    firstLogin: false,

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
const forgotPasswordService = async (email) => {

  const employee = await findUserByEmail(email);

  if (!employee) {
    throw new Error("Employee not found");
  }
  const otp = crypto.randomInt(
    100000,
    999999
  ).toString();

  const expiresAt = new Date(
    Date.now() + 5 * 60 * 1000
  );
  await saveOTP({
    email,
    otp,
    expiresAt,
  });
  await sendOTPEmail(
    email,
    otp
  );

  return {
    success: true,
    message: "OTP sent successfully",
  };
};
const verifyResetOTPService = async (
  email,
  otp
) => {
  const savedOTP = await findOTPByEmail(
    email
  );

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
const resetPasswordService = async (
  email,
  password
) => {
  const employee = await findUserByEmail(
    email
  );

  if (!employee) {
    throw new Error("Employee not found");
  }
  const passwordHash = await bcrypt.hash(
    password,
    10
  );
  await updatePassword(
    email,
    passwordHash
  );

  return {
    success: true,
    message: "Password reset successfully",
  };
};
// EXPORTS
export {
  addEmployeeService,
  verifyEmailService,
  loginService,
  changePasswordService,
  forgotPasswordService,
  verifyResetOTPService,
  resetPasswordService,
};