import prisma from "../../config/prisma.js";


// ==========================
// Find User By Email
// ==========================
const findUserByEmail = async (email) => {

    return await prisma.user.findUnique({
        where: {
            email
        }
    });

};



// ==========================
// Find Role By Name
// ==========================
const findRoleByName = async (name) => {
    return await prisma.role.findUnique({
        where: { name }
    });
};

// ==========================
// Create User
// ==========================
const createUser = async (userData) => {

    return await prisma.user.create({

        data: {

            email: userData.email,

            fullName: userData.fullName || "Employee",

            employeeId: userData.employeeId,

            phone: userData.phone,

            passwordHash: userData.passwordHash,

            ...(userData.roleId ? {
                role: {
                    connect: {
                        id: userData.roleId
                    }
                }
            } : {}),

            isVerified: true

        }

    });

};



// ==========================
// Save OTP
// ==========================
const saveOTP = async (otpData) => {

    return await prisma.emailOTP.create({

        data: otpData

    });

};



// ==========================
// Find Latest Unused OTP
// ==========================
const findOTPByEmail = async (email) => {

    return await prisma.emailOTP.findFirst({

        where: {

            email,

            isUsed:false

        },

        orderBy: {

            createdAt:"desc"

        }

    });

};



// ==========================
// Mark OTP As Used
// ==========================
const markOTPAsUsed = async (id) => {

    return await prisma.emailOTP.update({

        where: {

            id

        },

        data: {

            isUsed:true

        }

    });

};



// ==========================
// Find Verified OTP
// ==========================
const findVerifiedOTP = async(email)=>{

    return await prisma.emailOTP.findFirst({

        where: {

            email,

            isUsed:true

        },

        orderBy: {

            createdAt:"desc"

        }

    });

};



export {
    findRoleByName,
    findUserByEmail,
    createUser,
    saveOTP,
    findOTPByEmail,
    markOTPAsUsed,
    findVerifiedOTP
};