import bcrypt from "bcrypt";
import crypto from "crypto";

import { sendVerificationEmail } from "../../config/mail.js";

import {
  findUserByEmail,
  findUserByEmployeeId,
  findUserByPhone,
  findRoleByName,
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "./employees.repository.js";
const addEmployeeService = async (userData) => {
  const emailExists = await findUserByEmail(userData.email);

  if (emailExists) {
    throw new Error("Email already exists");
  }

  const employeeExists = await findUserByEmployeeId(userData.employeeId);

  if (employeeExists) {
    throw new Error("Employee ID already exists");
  }

  const phoneExists = await findUserByPhone(userData.phone);

  if (phoneExists) {
    throw new Error("Phone number already exists");
  }

  const role = await findRoleByName(userData.role);

  if (!role) {
    throw new Error("Role not found");
  }

  const passwordHash = await bcrypt.hash(userData.password, 10);

  const verificationToken = crypto.randomUUID();
  const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  // Employee starts as unverified — must click YES in their email
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

  let emailSent = false;
  let emailError = null;

  try {
    await sendVerificationEmail(employee.email, verificationToken);
    emailSent = true;
  } catch (err) {
    console.error("⚠️ Failed to send verification email:", err.message);
    emailError = err.message;
  }

  return {
    success: true,
    message: emailSent
      ? "Employee created. Verification email sent — waiting for employee to confirm."
      : `Employee created, but email failed: ${emailError}. You can resend from the table.`,
    emailSent,
    employee,
  };
};

const resendVerificationEmailService = async (id) => {
  const employee = await getEmployeeById(id);

  if (!employee) throw new Error("Employee not found");
  if (employee.isVerified) throw new Error("This employee is already verified.");

  const verificationToken = crypto.randomUUID();
  const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await updateEmployee(id, { verificationToken, verificationExpires });
  await sendVerificationEmail(employee.email, verificationToken);

  return {
    success: true,
    message: `Verification email re-sent to ${employee.email}.`,
  };
};



const fetchAllEmployees = async () => {
  const employees = await getAllEmployees();

  return {
    success: true,
    data: employees,
  };
};
const fetchEmployeeById = async (id) => {
  const employee = await getEmployeeById(id);

  if (!employee) {
    throw new Error("Employee not found");
  }

  return {
    success: true,
    data: employee,
  };
};
const modifyEmployee = async (id, updateData) => {
  const existingEmployee = await getEmployeeById(id);

  if (!existingEmployee) {
    throw new Error("Employee not found");
  }

  const dataToUpdate = { ...updateData };

  if (dataToUpdate.role) {
    const role = await findRoleByName(dataToUpdate.role);
    if (!role) throw new Error("Role not found");
    dataToUpdate.roleId = role.id;
    delete dataToUpdate.role;
  }

  if (dataToUpdate.email && dataToUpdate.email !== existingEmployee.email) {
    const emailExists = await findUserByEmail(dataToUpdate.email);
    if (emailExists) throw new Error("Email already exists");
  }

  if (dataToUpdate.employeeId && dataToUpdate.employeeId !== existingEmployee.employeeId) {
    const employeeExists = await findUserByEmployeeId(dataToUpdate.employeeId);
    if (employeeExists) throw new Error("Employee ID already exists");
  }

  if (dataToUpdate.phone && dataToUpdate.phone !== existingEmployee.phone) {
    const phoneExists = await findUserByPhone(dataToUpdate.phone);
    if (phoneExists) throw new Error("Phone number already exists");
  }

  if (dataToUpdate.password) {
    dataToUpdate.passwordHash = await bcrypt.hash(dataToUpdate.password, 10);
    delete dataToUpdate.password;
  }

  const updatedEmployee = await updateEmployee(id, dataToUpdate);

  return {
    success: true,
    message: "Employee updated successfully",
    data: updatedEmployee,
  };
};
const removeEmployee = async (id) => {
  const existingEmployee = await getEmployeeById(id);

  if (!existingEmployee) {
    throw new Error("Employee not found");
  }

  await deleteEmployee(id);

  return {
    success: true,
    message: "Employee deleted successfully",
  };
};

export {
  addEmployeeService,
  fetchAllEmployees,
  fetchEmployeeById,
  modifyEmployee,
  removeEmployee,
};