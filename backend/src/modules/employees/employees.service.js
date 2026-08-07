import bcrypt from "bcrypt";
import crypto from "crypto";

import { sendVerificationEmail } from "../../config/mail.js";

import {
  findUserByEmail,
  findUserByEmployeeId,
  findRoleByName,
  createEmployee,
  findUserByVerificationToken,
  verifyEmployee,
} from "./employee.repository.js";

// Add Employee
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

// Verify Email
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

export {
  addEmployeeService,
  verifyEmailService,
};