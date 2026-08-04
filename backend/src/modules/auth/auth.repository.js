import prisma from "../../config/prisma.js";

// ==========================
// Find User By Email
// ==========================
const findUserByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: {
            email: email
        }
    });
};

// ==========================
// Create User
// ==========================
const createUser = async (userData) => {
    return await prisma.user.create({
        data: userData
    });
};

// Save OTP

const saveOTP = async (otpData) => {
    return await prisma.emailOTP.create({
        data: otpData
    });
};

// Find Latest Unused OTP

const findOTPByEmail = async (email) => {
    return await prisma.emailOTP.findFirst({
        where: {
            email: email,
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
            id: id
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
            email: email,
            isUsed: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};

export {
    findUserByEmail,
    createUser,
    saveOTP,
    findOTPByEmail,
    markOTPAsUsed,
    findVerifiedOTP
};