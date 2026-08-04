import {
    sendOTPService,
    verifyOTPService,
    signupService,
    loginService,
    forgotPasswordService,
    verifyResetOTPService,
    resetPasswordService
} from "./auth.service.js";

// Send OTP
const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const result = await sendOTPService(email);

        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
// Verify OTP
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const result = await verifyOTPService(email, otp);

        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Signup
const signup = async (req, res) => {
    try {
        const result = await signupService(req.body);

        return res.status(201).json(result);

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Login

const login = async (req, res) => {
    try {
        const { login, password } = req.body;

        const result = await loginService(login, password);

        return res.status(200).json(result);

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};
// Forgot Password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const result = await forgotPasswordService(email);

        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Verify Reset OTP
const verifyResetOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const result = await verifyResetOTPService(email, otp);

        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
// Reset Password
const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await resetPasswordService(email, password);

        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export {
    sendOTP,
    verifyOTP,
    signup,
    login,
    forgotPassword,
    verifyResetOTP,
    resetPassword
};