import { Router } from "express";
import * as categoryController from "./category.controller.js";
import {
  createCategoryValidation,
  updateCategoryValidation,
} from "./category.validation.js";

import validateRequest from "../../middlewares/validateRequest.js";

const router = Router();

/**
 * Create Category
 * POST /api/categories
 */
router.post(
  "/",
  createCategoryValidation,
  validateRequest,
  categoryController.createCategory
);

/**
 * Get All Categories
 * GET /api/categories
 */
router.get("/", categoryController.getAllCategories);

/**
 * Search Categories
 * GET /api/categories/search?search=electronics
 */
router.get(
  "/search",
  categoryController.searchCategories
);

/**
 * Get Category By ID
 * GET /api/categories/:id
 */
router.get(
  "/:id",
  categoryController.getCategoryById
);

/**
 * Update Category
 * PUT /api/categories/:id
 */
router.put(
  "/:id",
  updateCategoryValidation,
  validateRequest,
  categoryController.updateCategory
);

/**
 * Delete Category
 * DELETE /api/categories/:id
 */
router.delete(
  "/:id",
  categoryController.deleteCategory
);

export default router;