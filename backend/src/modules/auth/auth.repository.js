const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const findUserByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: {
            email: email
        }
    });
};
const createUser = async (userData) => {
    return await prisma.user.create({
        data: userData
    });
};
const saveOTP = async (otpData) => {
    return await prisma.emailOTP.create({
        data: otpData
    });
};
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
module.exports = {

    findUserByEmail,
    createUser,
    saveOTP,
    findOTPByEmail,
    markOTPAsUsed

};