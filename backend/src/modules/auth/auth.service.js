const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { sendOTPEmail } = require("../../config/mail");
const {
    findUserByEmail,
    createUser,
    saveOTP,
    findOTPByEmail,
    markOTPAsUsed,
    findVerifiedOTP,
} = require("./auth.repository");

// Send OTP
const sendOTPService = async (email) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new Error("Email already registered");
    }
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await saveOTP({
        email,
        otp,
        expiresAt,
    });
    // Send OTP to Email
    await sendOTPEmail(email, otp);
    return {
        success: true,
        message: "OTP sent successfully",
    };
};
// Verify OTP

const verifyOTPService = async (email, otp) => {
    const savedOTP = await findOTPByEmail(email);
    if (!savedOTP) {
        throw new Error("OTP not found");
    }
    if (savedOTP.isUsed) {
        throw new Error("OTP already used");
    }
    if (savedOTP.expiresAt < new Date()) {
        throw new Error("OTP expired");
    }
    if (savedOTP.otp !== otp) {
        throw new Error("Invalid OTP");
    }
    await markOTPAsUsed(savedOTP.id);
    return {
        success: true,
        message: "OTP verified successfully",
    };
};
// Signup
const signupService = async (userData) => {
    const existingUser = await findUserByEmail(userData.email);
    if (existingUser) {
        throw new Error("Email already registered");
    }
    const verifiedOTP = await findVerifiedOTP(userData.email);
    if (!verifiedOTP) {
        throw new Error("Please verify your email first");
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await createUser({
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        passwordHash: hashedPassword,
        roleId: userData.roleId,
        isVerified: true,
    });
    return user;
};
module.exports = {
    sendOTPService,
    verifyOTPService,
    signupService,
};