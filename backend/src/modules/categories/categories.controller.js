// src/modules/category/category.controller.js

const categoryService = require("./category.service");

class CategoryController {
  async createCategory(req, res, next) {
    try {
      const category = await categoryService.createCategory(req.body);

      return res.status(201).json({
        success: true,
        message: "Category created successfully.",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllCategories(req, res, next) {
    try {
      const categories = await categoryService.getAllCategories(req.query);

      return res.status(200).json({
        success: true,
        message: "Categories fetched successfully.",
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategoryById(req, res, next) {
    try {
      const { id } = req.params;

      const category = await categoryService.getCategoryById(id);

      return res.status(200).json({
        success: true,
        message: "Category fetched successfully.",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const { id } = req.params;

      const category = await categoryService.updateCategory(id, req.body);

      return res.status(200).json({
        success: true,
        message: "Category updated successfully.",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCategoryStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const category = await categoryService.updateCategoryStatus(id, status);

      return res.status(200).json({
        success: true,
        message: "Category status updated successfully.",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;

      await categoryService.deleteCategory(id);

      return res.status(200).json({
        success: true,
        message: "Category deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();