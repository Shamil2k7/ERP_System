import {
    signupSchema,
    sendOTPSchema,
    verifyOTPSchema
} from "./auth.schema.js";

// ==========================
// Validate Send OTP
// ==========================
const validateSendOTP = (req, res, next) => {

    const { error } = sendOTPSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    next();
};

// ==========================
// Validate Verify OTP
// ==========================
const validateVerifyOTP = (req, res, next) => {

    const { error } = verifyOTPSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    next();
};

// ==========================
// Validate Signup

const validateSignup = (req, res, next) => {

    const { error } = signupSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    next();
};

export {
    validateSendOTP,
    validateVerifyOTP,
    validateSignup
};