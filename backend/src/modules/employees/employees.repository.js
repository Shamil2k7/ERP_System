import prisma from "../../config/prisma.js";

const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};
const findUserByEmployeeId = async (employeeId) => {
  return await prisma.user.findUnique({
    where: {
      employeeId,
    },
  });
};
const findUserByPhone = async (phone) => {
  return await prisma.user.findUnique({
    where: {
      phone,
    },
  });
};
const findRoleByName = async (name) => {
  if (!name) return null;

  let role = await prisma.role.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  });

  if (!role) {
    role = await prisma.role.create({
      data: {
        name,
      },
    });
  }

  return role;
};
const createEmployee = async (userData) => {
  return await prisma.user.create({
    data: {
      fullName: userData.fullName,
      email: userData.email,
      employeeId: userData.employeeId,
      phone: userData.phone,
      passwordHash: userData.passwordHash,

      role: {
        connect: {
          id: userData.roleId,
        },
      },

      isVerified: false,
      firstLogin: true,

      verificationToken: userData.verificationToken,
      verificationExpires: userData.verificationExpires,
    },

    include: {
      role: true,
    },
  });
};
const getAllEmployees = async () => {
  return await prisma.user.findMany({
    include: {
      role: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
const getEmployeeById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      role: true,
    },
  });
};
const updateEmployee = async (id, data) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
    include: {
      role: true,
    },
  });
};
const deleteEmployee = async (id) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};

export {
  findUserByEmail,
  findUserByEmployeeId,
  findUserByPhone,
  findRoleByName,
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};