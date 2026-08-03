import Joi from "joi";

// ==========================
// Signup Validation
// ==========================

const signupSchema = Joi.object({

    fullName: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.empty": "Full name is required",
            "string.min": "Full name must be at least 3 characters",
            "string.max": "Full name cannot exceed 50 characters",
            "any.required": "Full name is required"
        }),

    employeeId: Joi.string()
        .trim()
        .allow(null, "")
        .optional(),

    email: Joi.string()
        .email()
        .lowercase()
        .trim()
        .required()
        .messages({
            "string.email": "Invalid email address",
            "string.empty": "Email is required",
            "any.required": "Email is required"
        }),

    phone: Joi.string()
        .pattern(/^[6-9]\d{9}$/)
        .required()
        .messages({
            "string.pattern.base": "Phone number must contain 10 digits",
            "string.empty": "Phone number is required",
            "any.required": "Phone number is required"
        }),

    password: Joi.string()
        .min(8)
        .max(20)
        .required()
        .messages({
            "string.min": "Password must be at least 8 characters",
            "string.max": "Password cannot exceed 20 characters",
            "string.empty": "Password is required",
            "any.required": "Password is required"
        }),

    roleId: Joi.string()
        .required()
        .messages({
            "string.empty": "Role is required",
            "any.required": "Role is required"
        })

});


// ==========================
// Send OTP Validation
// ==========================

const sendOTPSchema = Joi.object({

    email: Joi.string()
        .email()
        .lowercase()
        .trim()
        .required()
        .messages({
            "string.email": "Invalid email address",
            "string.empty": "Email is required",
            "any.required": "Email is required"
        })

});


// ==========================
// Verify OTP Validation
// ==========================

const verifyOTPSchema = Joi.object({

    email: Joi.string()
        .email()
        .lowercase()
        .trim()
        .required(),

    otp: Joi.string()
        .length(6)
        .required()
        .messages({
            "string.length": "OTP must be 6 digits",
            "string.empty": "OTP is required",
            "any.required": "OTP is required"
        })

});


export {
    signupSchema,
    sendOTPSchema,
    verifyOTPSchema
};