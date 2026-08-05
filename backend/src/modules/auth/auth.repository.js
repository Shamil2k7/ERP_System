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

const findUserByLogin = async (login) => {
  return await prisma.user.findFirst({
    where: {
      OR: [
        { email: login },
        { employeeId: login },
      ],
    },
    include: {
      role: true,
    },
  });
};

const findRoleByName = async (name) => {
  return await prisma.role.findUnique({
    where: {
      name,
    },
  });
};
const createUser = async (userData) => {
  return await prisma.user.create({
    data: {
      fullName: userData.fullName || "Employee",
      email: userData.email,
      employeeId: userData.employeeId,
      phone: userData.phone,
      passwordHash: userData.passwordHash,

      ...(userData.roleId && {
        role: {
          connect: {
            id: userData.roleId,
          },
        },
      }),

      isVerified: true,
    },

    include: {
      role: true,
    },
  });
};
const saveOTP = async (otpData) => {
  return await prisma.emailOTP.create({
    data: otpData,
  });
};

const findOTPByEmail = async (email) => {
  return await prisma.emailOTP.findFirst({
    where: {
      email,
      isUsed: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
const markOTPAsUsed = async (id) => {
  return await prisma.emailOTP.update({
    where: {
      id,
    },
    data: {
      isUsed: true,
    },
  });
};
const findVerifiedOTP = async (email) => {
  return await prisma.emailOTP.findFirst({
    where: {
      email,
      isUsed: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
const updatePassword = async (email, passwordHash) => {
  return await prisma.user.update({
    where: {
      email,
    },
    data: {
      passwordHash,
    },
  });
};

export {
  findUserByEmail,
  findUserByEmployeeId,
  findUserByLogin,
  findRoleByName,
  createUser,
  saveOTP,
  findOTPByEmail,
  markOTPAsUsed,
  findVerifiedOTP,
  updatePassword,
};