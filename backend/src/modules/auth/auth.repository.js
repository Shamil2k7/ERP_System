import prisma from "../../config/prisma.js";

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
const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
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
const updatePassword = async (email, passwordHash) => {
  return await prisma.user.update({
    where: {
      email,
    },
    data: {
      passwordHash,
      firstLogin: false,
    },
  });
};

const findUserByVerificationToken = async (token) => {
  return await prisma.user.findFirst({
    where: {
      verificationToken: token,
    },
  });
};

const updateUserVerification = async (id, isVerified) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      isVerified,
      verificationToken: null,
      verificationExpires: null,
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
  findUserByVerificationToken,
  updateUserVerification,
};