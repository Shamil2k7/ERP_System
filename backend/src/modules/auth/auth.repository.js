import prisma from "../../config/prisma.js";

// Find User By Email
const findUserByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: { email }
    });
};

// Find User By Employee ID
const findUserByEmployeeId = async (employeeId) => {
    return await prisma.user.findUnique({
        where: { employeeId }
    });
};
// Find User By Login (Email or Employee ID)
const findUserByLogin = async (login) => {
    return await prisma.user.findFirst({
        where: {
            OR: [
                { email: login },
                { employeeId: login }
            ]
        },
        include: {
            role: true
        }
    });
};

// Find Role By Name
const findRoleByName = async (name) => {
    return await prisma.role.findUnique({
        where: { name }
    });
};

// Create User
const createUser = async (userData) => {
    return await prisma.user.create({
        data: {
            fullName: userData.fullName || "Employee",
            email: userData.email,
            employeeId: userData.employeeId,
            phone: userData.phone,
            passwordHash: userData.passwordHash,

            ...(userData.roleId
                ? {
                      role: {
                          connect: {
                              id: userData.roleId
                          }
                      }
                  }
                : {}),

            isVerified: true
        },
        include: {
            role: true
        }
    });
};

// Save OTP
const saveOTP = async (otpData) => {
    return await prisma.emailOTP.create({
        data: otpData
    });
};
// Find Latest OTP
const findOTPByEmail = async (email) => {
    return await prisma.emailOTP.findFirst({
        where: {
            email,
            isUsed: false
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};
// Mark OTP As Used
const markOTPAsUsed = async (id) => {
    return await prisma.emailOTP.update({
        where: {
            id
        },
        data: {
            isUsed: true
        }
    });
};
// Find Verified OTP

const findVerifiedOTP = async (email) => {
    return await prisma.emailOTP.findFirst({
        where: {
            email,
            isUsed: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};
// Update Password
const updatePassword = async (email, passwordHash) => {
    return await prisma.user.update({
        where: {
            email
        },
        data: {
            passwordHash
        }
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
    updatePassword
};