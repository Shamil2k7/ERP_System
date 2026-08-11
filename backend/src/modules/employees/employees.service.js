import bcrypt from "bcrypt";
import { sendEmployeeCredentialsEmail } from "../../config/mail.js";

import {
  getAllEmployees,
  getEmployeeById,
  findEmployeeByEmail,
  findEmployeeByEmployeeId,
  findEmployeeByPhone,
  findRoleByName,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "./employees.repository.js";

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

const addEmployee = async ({
  fullName,
  employeeId,
  email,
  phone,
  role,
  password,
}) => {
  if (
    !fullName ||
    !employeeId ||
    !email ||
    !phone ||
    !role ||
    !password
  ) {
    throw new Error("All employee fields are required");
  }

  const existingEmail = await findEmployeeByEmail(email);

  if (existingEmail) {
    throw new Error("Email already exists");
  }

  const existingEmployeeId =
    await findEmployeeByEmployeeId(employeeId);

  if (existingEmployeeId) {
    throw new Error("Employee ID already exists");
  }

  const existingPhone =
    await findEmployeeByPhone(phone);

  if (existingPhone) {
    throw new Error("Phone number already exists");
  }

  const employeeRole = await findRoleByName(role);

  if (!employeeRole) {
    throw new Error(`Role "${role}" not found`);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const employee = await createEmployee({
    fullName,
    employeeId,
    email,
    phone,
    passwordHash,
    isVerified: true,
    firstLogin: true,
    roleId: employeeRole.id,
  });

  // Send login credentials via email
  let emailSent = false;
  try {
    await sendEmployeeCredentialsEmail(email, employeeId, password);
    emailSent = true;
  } catch (emailError) {
    console.error("Warning: Failed to send welcome email to employee:", emailError.message);
  }

  const {
    passwordHash: removedPassword,
    verificationToken,
    verificationExpires,
    ...safeEmployee
  } = employee;

  return {
    success: true,
    message: emailSent
      ? "Employee created successfully and credentials email sent"
      : "Employee created successfully (Email delivery pending)",
    data: safeEmployee,
    credentials: {
      employeeId,
      email,
      password,
    },
    emailSent,
  };
};


const modifyEmployee = async (id, updateData) => {
  const existingEmployee = await getEmployeeById(id);

  if (!existingEmployee) {
    throw new Error("Employee not found");
  }

  const updatedEmployee = await updateEmployee(
    id,
    updateData
  );

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
  fetchAllEmployees,
  fetchEmployeeById,
  addEmployee,
  modifyEmployee,
  removeEmployee,
};

