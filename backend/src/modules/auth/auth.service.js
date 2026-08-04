import bcrypt from "bcrypt";
import crypto from "crypto";

import { sendOTPEmail } from "../../config/mail.js";

import {
    findUserByEmail,
    createUser,
    saveOTP,
    findOTPByEmail,
    markOTPAsUsed,
    findVerifiedOTP,
    findRoleByName
} from "./auth.repository.js";

// Send OTP

const sendOTPService = async (email) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new Error("Email already registered");
    }
    const otp = crypto
        .randomInt(100000, 999999)
        .toString();
    const expiresAt = new Date(
        Date.now() + 5 * 60 * 1000
    );
    await saveOTP({
        email,
        otp,
        expiresAt
    });
    await sendOTPEmail(email, otp);
    return {
        success:true,
        message:"OTP sent successfully"
    };
};
// Verify OTP
const verifyOTPService = async (email, otp) => {
    const savedOTP = await findOTPByEmail(email);
    if(!savedOTP){
        throw new Error("OTP not found");
    }
    if(savedOTP.isUsed){
        throw new Error("OTP already used");
    }
    if(savedOTP.expiresAt < new Date()){
        throw new Error("OTP expired");
    }
    if(savedOTP.otp !== otp){
        throw new Error("Invalid OTP");
    }
    await markOTPAsUsed(savedOTP.id);
    return {
        success:true,
        message:"OTP verified successfully"
    };
};

// Signup

const signupService = async (userData)=>{
    const existingUser = await findUserByEmail(
        userData.email
    );
    if(existingUser){
        throw new Error(
            "Email already registered"
        );
    }
    const verifiedOTP = await findVerifiedOTP(
        userData.email
    );
    if(!verifiedOTP){
        throw new Error(
            "Please verify your email first"
        );
    }
    const hashedPassword = await bcrypt.hash(
        userData.password,
        10
    );

    let finalRoleId = userData.roleId;

    if (!finalRoleId) {
        const empRole = await findRoleByName("Employee");
        if (empRole) {
            finalRoleId = empRole.id;
        }
    }

    const user = await createUser({
        email:userData.email,
        employeeId:userData.employeeId,
        phone:userData.phone,
        passwordHash:hashedPassword,
        // USER role UUID
        roleId:finalRoleId
    });
    return user;
};
export {
    sendOTPService,
    verifyOTPService,
    signupService
};