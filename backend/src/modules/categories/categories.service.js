// src/modules/category/category.service.js

const categoryRepository = require("./category.repository");

class CategoryService {
  async createCategory(data) {
    const { name, code } = data;

    const existingCategory = await categoryRepository.findByName(name);

    if (existingCategory) {
      throw new Error("Category name already exists.");
    }

    const existingCode = await categoryRepository.findByCode(code);

    if (existingCode) {
      throw new Error("Category code already exists.");
    }

    return await categoryRepository.create(data);
  }

  async getAllCategories(query) {
    return await categoryRepository.findAll(query);
  }

  async getCategoryById(id) {
    const category = await categoryRepository.findById(id);

    if (!category) {
      throw new Error("Category not found.");
    }

    return category;
  }

  async updateCategory(id, data) {
    const category = await categoryRepository.findById(id);

    if (!category) {
      throw new Error("Category not found.");
    }

    if (data.name && data.name !== category.name) {
      const existingCategory = await categoryRepository.findByName(data.name);

      if (existingCategory) {
        throw new Error("Category name already exists.");
      }
    }

    if (data.code && data.code !== category.code) {
      const existingCode = await categoryRepository.findByCode(data.code);

      if (existingCode) {
        throw new Error("Category code already exists.");
      }
    }

    return await categoryRepository.update(id, data);
  }

  async updateCategoryStatus(id, status) {
    const category = await categoryRepository.findById(id);

    if (!category) {
      throw new Error("Category not found.");
    }

    return await categoryRepository.updateStatus(id, status);
  }

  async deleteCategory(id) {
    const category = await categoryRepository.findById(id);

    if (!category) {
      throw new Error("Category not found.");
    }

    return await categoryRepository.delete(id);
  }
}

module.exports = new CategoryService();