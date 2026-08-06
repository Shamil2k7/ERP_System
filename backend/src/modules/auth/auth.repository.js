import prisma from "../../config/prisma.js";

// Find user by email
const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

// Find user by employee ID
const findUserByEmployeeId = async (employeeId) => {
  return await prisma.user.findUnique({
    where: {
      employeeId,
    },
  });
};

// Login using email or employee ID
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

// Find role
const findRoleByName = async (name) => {
  return await prisma.role.findUnique({
    where: {
      name,
    },
  });
};

// Create Employee
const createEmployee = async (userData) => {
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

// Find user using verification token
const findUserByVerificationToken = async (token) => {
  return await prisma.user.findFirst({
    where: {
      verificationToken: token,
    },
  });
};

// Verify employee
const verifyEmployee = async (id) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      isVerified: true,
      verificationToken: null,
      verificationExpires: null,
    },
  });
};

// Save OTP (Forgot Password)
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

// Mark OTP as used
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



// Change Password
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

export {
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
};