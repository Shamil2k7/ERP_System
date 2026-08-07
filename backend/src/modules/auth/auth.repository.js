import prisma from "../../config/prisma.js";

// Login
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

// Find User By Email
const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

// Save OTP
const saveOTP = async (otpData) => {
  return await prisma.emailOTP.create({
    data: otpData,
  });
};

// Find OTP
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

// Mark OTP Used
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

// Update Password
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
  findUserByLogin,
  findUserByEmail,
  saveOTP,
  findOTPByEmail,
  markOTPAsUsed,
  updatePassword,
};