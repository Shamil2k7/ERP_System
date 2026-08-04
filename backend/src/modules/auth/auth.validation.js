import {
  signupSchema,
  sendOTPSchema,
  verifyOTPSchema,
  loginSchema,
  forgotPasswordSchema,
  verifyResetOTPSchema,
  resetPasswordSchema
} from "./auth.schema.js";
// Validate Send OTP
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
// Validate Verify OTP
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
// Validate Login
const validateLogin = (req, res, next) => {

    const { error } = loginSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }
    next();
};
// Validate Forgot Password
const validateForgotPassword = (req, res, next) => {

    const { error } = forgotPasswordSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }
    next();
};
// Validate Reset OTP
const validateResetOTP = (req, res, next) => {

    const { error } = verifyResetOTPSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }
    next();
};
// Validate Reset Password
const validateResetPassword = (req, res, next) => {

    const { error } = resetPasswordSchema.validate(req.body);

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
    validateSignup,
    validateLogin,
    validateForgotPassword,
    validateResetOTP,
    validateResetPassword
};