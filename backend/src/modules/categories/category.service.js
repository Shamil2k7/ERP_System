import * as categoryRepository from "./category.repository.js";

export const createCategory = async (data) => {
  // Check duplicate category code
  const existingCode = await categoryRepository.getCategoryByCode(data.code);

  if (existingCode) {
    throw new Error("Category code already exists.");
  }

  return await categoryRepository.createCategory(data);
};


export const getAllCategories = async () => {
  return await categoryRepository.getAllCategories();
};

export const getCategoryById = async (id) => {
  const category = await categoryRepository.getCategoryById(id);

  if (!category) {
    throw new Error("Category not found.");
  }

  return category;
};

export const updateCategory = async (id, data) => {
  const category = await categoryRepository.getCategoryById(id);

  if (!category) {
    throw new Error("Category not found.");
  }

  if (data.code && data.code !== category.code) {
    const existingCode = await categoryRepository.getCategoryByCode(data.code);

    if (existingCode) {
      throw new Error("Category code already exists.");
    }
  }

  return await categoryRepository.updateCategory(id, data);
};


export const deleteCategory = async (id) => {
  const category = await categoryRepository.getCategoryById(id);

  if (!category) {
    throw new Error("Category not found.");
  }

  return await categoryRepository.deleteCategory(id);
};