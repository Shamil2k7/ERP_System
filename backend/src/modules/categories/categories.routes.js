// src/modules/category/category.routes.js

const express = require("express");
const router = express.Router();

const categoryController = require("./category.controller");
const {
  createCategorySchema,
  updateCategorySchema,
} = require("./category.validator");

const validateRequest = require("../../middleware/validateRequest");

// Create Category
router.post(
  "/",
  validateRequest(createCategorySchema),
  categoryController.createCategory
);

// Get All Categories
router.get("/", categoryController.getAllCategories);

// Get Category By ID
router.get("/:id", categoryController.getCategoryById);

// Update Category
router.put(
  "/:id",
  validateRequest(updateCategorySchema),
  categoryController.updateCategory
);

// Update Category Status
router.patch("/:id/status", categoryController.updateCategoryStatus);

// Delete Category
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;