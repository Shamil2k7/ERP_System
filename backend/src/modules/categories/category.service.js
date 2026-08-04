import * as categoryRepository from "./category.repository.js";

/**
 * Create Category
 */
export const createCategory = async (data) => {
  // Check duplicate category code
  const existingCode = await categoryRepository.getCategoryByCode(data.code);

  if (existingCode) {
    throw new Error("Category code already exists.");
  }

  return await categoryRepository.createCategory(data);
};

/**
 * Get All Categories
 */
export const getAllCategories = async () => {
  return await categoryRepository.getAllCategories();
};

/**
 * Get Category By ID
 */
export const getCategoryById = async (id) => {
  const category = await categoryRepository.getCategoryById(id);

  if (!category) {
    throw new Error("Category not found.");
  }

  return category;
};

/**
 * Update Category
 */
export const updateCategory = async (id, data) => {
  const category = await categoryRepository.getCategoryById(id);

  if (!category) {
    throw new Error("Category not found.");
  }

  // Check duplicate code (if code is changing)
  if (data.code && data.code !== category.code) {
    const existingCode = await categoryRepository.getCategoryByCode(data.code);

    if (existingCode) {
      throw new Error("Category code already exists.");
    }
  }

  return await categoryRepository.updateCategory(id, data);
};

/**
 * Delete Category
 */
export const deleteCategory = async (id) => {
  const category = await categoryRepository.getCategoryById(id);

  if (!category) {
    throw new Error("Category not found.");
  }

  return await categoryRepository.deleteCategory(id);
};