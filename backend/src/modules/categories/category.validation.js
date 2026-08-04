import { body } from "express-validator";

export const createCategoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Category name must be between 2 and 100 characters"),

  body("code")
    .trim()
    .notEmpty()
    .withMessage("Category code is required")
    .isLength({ min: 2, max: 20 })
    .withMessage("Category code must be between 2 and 20 characters")
    .matches(/^[A-Z0-9_-]+$/)
    .withMessage(
      "Category code must contain only uppercase letters, numbers, hyphen (-), or underscore (_)"
    ),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),

  body("image")
    .optional()
    .isURL()
    .withMessage("Image must be a valid URL"),

  body("status")
    .optional()
    .isBoolean()
    .withMessage("Status must be true or false"),
];

export const updateCategoryValidation = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Category name must be between 2 and 100 characters"),

  body("code")
    .optional()
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage("Category code must be between 2 and 20 characters")
    .matches(/^[A-Z0-9_-]+$/)
    .withMessage(
      "Category code must contain only uppercase letters, numbers, hyphen (-), or underscore (_)"
    ),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),

  body("image")
    .optional()
    .isURL()
    .withMessage("Image must be a valid URL"),

  body("status")
    .optional()
    .isBoolean()
    .withMessage("Status must be true or false"),
];