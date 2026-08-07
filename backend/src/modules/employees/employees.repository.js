import prisma from "../../config/prisma.js";

// Find Employee By Email
const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

// Find Employee By Employee ID
const findUserByEmployeeId = async (employeeId) => {
  return await prisma.user.findUnique({
    where: { employeeId },
  });
};

// Find Role
const findRoleByName = async (name) => {
  return await prisma.role.findUnique({
    where: { name },
  });
};

// Create Employee
const createEmployee = async (userData) => {
  return await prisma.user.create({
    data: {
      fullName: userData.fullName,
      email: userData.email,
      employeeId: userData.employeeId,
      phone: userData.phone,
      passwordHash: userData.passwordHash,
      isVerified: false,

      role: {
        connect: {
          id: userData.roleId,
        },
      },
    },

    include: {
      role: true,
    },
  });
};

export {
  findUserByEmail,
  findUserByEmployeeId,
  findRoleByName,
  createEmployee,
};