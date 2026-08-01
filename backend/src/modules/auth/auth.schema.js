const Joi = require("joi");

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

    email: Joi.string()
        .email()
        .lowercase()
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
            "string.pattern.base": "Invalid phone number",
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

module.exports = {
    signupSchema
};