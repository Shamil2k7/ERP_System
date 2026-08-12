import bcrypt from "bcrypt";

import { sendEmployeeCredentialsEmail } from "../../config/mail.js";

import { recordAuditLog } from "../audit/audit.service.js";

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


// Remove sensitive fields before sending employee data to frontend
const removeSensitiveFields = (employee) => {
  if (!employee) {
    return employee;
  }

  const {
    passwordHash,
    verificationToken,
    verificationExpires,
    ...safeEmployee
  } = employee;

  return safeEmployee;
};


// Get all employees
const fetchAllEmployees = async () => {
  const employees = await getAllEmployees();

  return {
    success: true,
    data: employees.map(removeSensitiveFields),
  };
};


// Get employee by ID
const fetchEmployeeById = async (id) => {
  const employee = await getEmployeeById(id);

  if (!employee) {
    throw new Error("Employee not found");
  }

  return {
    success: true,
    data: removeSensitiveFields(employee),
  };
};


// Add employee
const addEmployee = async (
  {
    fullName,
    employeeId,
    email,
    phone,
    role,
    password,
  },
  req
) => {

  // Basic validation
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


  // Clean input
  const cleanFullName = fullName.trim();
  const cleanEmployeeId = employeeId.trim();
  const cleanEmail = email.trim().toLowerCase();
  const cleanPhone = phone.trim();
  const cleanRole = role.trim();


  // Check email
  const existingEmail = await findEmployeeByEmail(cleanEmail);

  if (existingEmail) {
    throw new Error("Email already exists");
  }


  // Check employee ID
  const existingEmployeeId =
    await findEmployeeByEmployeeId(cleanEmployeeId);

  if (existingEmployeeId) {
    throw new Error("Employee ID already exists");
  }


  // Check phone
  const existingPhone =
    await findEmployeeByPhone(cleanPhone);

  if (existingPhone) {
    throw new Error("Phone number already exists");
  }


  // Check role
  const employeeRole =
    await findRoleByName(cleanRole);

  if (!employeeRole) {
    throw new Error(`Role "${cleanRole}" not found`);
  }


  // Hash password
  const passwordHash = await bcrypt.hash(password, 12);


  // Create employee
  const employee = await createEmployee({
    fullName: cleanFullName,
    employeeId: cleanEmployeeId,
    email: cleanEmail,
    phone: cleanPhone,
    passwordHash,

    // Admin created the account
    isVerified: true,

    // Employee must change password on first login
    firstLogin: true,

    roleId: employeeRole.id,
  });


  // Send credentials email
  let emailSent = false;

  try {
    await sendEmployeeCredentialsEmail(
      cleanEmail,
      cleanEmployeeId,
      password
    );

    emailSent = true;

  } catch (emailError) {

    console.error(
      "Failed to send employee credentials email:",
      emailError.message
    );
  }


  // Audit log
  await recordAuditLog(req, {
    action: "CREATE",
    entity: "Employee",
    entityId: employee.id,

    // Never store the password here
    details: {
      fullName: cleanFullName,
      employeeId: cleanEmployeeId,
      email: cleanEmail,
      phone: cleanPhone,
      role: cleanRole,
      description: `Created new employee "${cleanFullName}" (ID: ${cleanEmployeeId}) with role "${cleanRole}"`,
    },
  });


  // Remove sensitive information
  const safeEmployee =
    removeSensitiveFields(employee);


  return {
    success: true,

    message: emailSent
      ? "Employee created successfully and credentials email sent"
      : "Employee created successfully, but email delivery failed",

    data: safeEmployee,

    // IMPORTANT:
    // Do NOT return the password here.
    emailSent,
  };
};


// Update employee
const modifyEmployee = async (
  id,
  updateData,
  req
) => {

  const existingEmployee =
    await getEmployeeById(id);

  if (!existingEmployee) {
    throw new Error("Employee not found");
  }


  // Only allow safe employee fields
  const allowedFields = [
    "fullName",
    "email",
    "phone",
    "employeeId",
    "roleId",
    "isVerified",
    "firstLogin",
  ];


  const safeUpdateData = {};

  for (const field of allowedFields) {

    if (
      updateData[field] !== undefined
    ) {
      safeUpdateData[field] =
        updateData[field];
    }
  }


  // Email normalization
  if (safeUpdateData.email) {

    safeUpdateData.email =
      safeUpdateData.email
        .trim()
        .toLowerCase();


    if (
      safeUpdateData.email !==
      existingEmployee.email
    ) {

      const emailExists =
        await findEmployeeByEmail(
          safeUpdateData.email
        );

      if (emailExists) {
        throw new Error(
          "Email already exists"
        );
      }
    }
  }


  // Employee ID check
  if (safeUpdateData.employeeId) {

    safeUpdateData.employeeId =
      safeUpdateData.employeeId.trim();


    if (
      safeUpdateData.employeeId !==
      existingEmployee.employeeId
    ) {

      const employeeIdExists =
        await findEmployeeByEmployeeId(
          safeUpdateData.employeeId
        );

      if (employeeIdExists) {
        throw new Error(
          "Employee ID already exists"
        );
      }
    }
  }


  // Phone check
  if (safeUpdateData.phone) {

    safeUpdateData.phone =
      safeUpdateData.phone.trim();


    if (
      safeUpdateData.phone !==
      existingEmployee.phone
    ) {

      const phoneExists =
        await findEmployeeByPhone(
          safeUpdateData.phone
        );

      if (phoneExists) {
        throw new Error(
          "Phone number already exists"
        );
      }
    }
  }


  // Update role if roleId is provided
  if (safeUpdateData.roleId) {

    const roleExists =
      await findRoleByName(
        safeUpdateData.roleId
      );

    // If your frontend sends roleId, this check
    // should instead be done using a findRoleById
    // repository method.
  }


  if (
    Object.keys(safeUpdateData).length === 0
  ) {
    throw new Error(
      "No valid fields to update"
    );
  }


  const updatedEmployee =
    await updateEmployee(
      id,
      safeUpdateData
    );


  // Audit log
  await recordAuditLog(req, {
    action: "UPDATE",
    entity: "Employee",
    entityId: id,

    details: {
      fullName: updatedEmployee.fullName || existingEmployee.fullName,
      employeeId: updatedEmployee.employeeId || existingEmployee.employeeId,
      email: updatedEmployee.email || existingEmployee.email,
      updatedFields: Object.keys(safeUpdateData),
      description: `Updated employee "${updatedEmployee.fullName || existingEmployee.fullName}" (ID: ${updatedEmployee.employeeId || existingEmployee.employeeId}) [Modified: ${Object.keys(safeUpdateData).join(", ")}]`,
    },
  });


  return {
    success: true,
    message:
      "Employee updated successfully",
    data:
      removeSensitiveFields(
        updatedEmployee
      ),
  };
};


// Delete employee
const removeEmployee = async (
  id,
  req
) => {

  const existingEmployee =
    await getEmployeeById(id);

  if (!existingEmployee) {
    throw new Error(
      "Employee not found"
    );
  }


  await deleteEmployee(id);


  // Audit log
  await recordAuditLog(req, {
    action: "DELETE",
    entity: "Employee",
    entityId: id,

    details: {
      fullName: existingEmployee.fullName,
      employeeId: existingEmployee.employeeId,
      email: existingEmployee.email,
      description: `Deleted employee "${existingEmployee.fullName}" (ID: ${existingEmployee.employeeId})`,
    },
  });


  return {
    success: true,
    message:
      "Employee deleted successfully",
  };
};


export {
  fetchAllEmployees,
  fetchEmployeeById,
  addEmployee,
  modifyEmployee,
  removeEmployee,
};