// src/modules/category/category.validator.js

const { z } = require("zod");

const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Category name must be at least 3 characters.")
    .max(100, "Category name cannot exceed 100 characters."),

  code: z
    .string()
    .trim()
    .min(2, "Category code is required.")
    .max(10, "Category code cannot exceed 10 characters.")
    .transform((value) => value.toUpperCase()),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters.")
    .optional(),

  image: z
    .string()
    .url("Invalid image URL.")
    .optional(),

  status: z
    .boolean()
    .optional(),
});

const updateCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Category name must be at least 3 characters.")
    .max(100, "Category name cannot exceed 100 characters.")
    .optional(),

  code: z
    .string()
    .trim()
    .min(2, "Category code is required.")
    .max(10, "Category code cannot exceed 10 characters.")
    .transform((value) => value.toUpperCase())
    .optional(),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters.")
    .optional(),

  image: z
    .string()
    .url("Invalid image URL.")
    .optional(),

  status: z
    .boolean()
    .optional(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};