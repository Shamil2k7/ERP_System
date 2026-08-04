import prisma from "../../config/prisma.js";
/**
 * Create Category
 */
export const createCategory = async (data) => {
  return await prisma.category.create({
    data,
  });
};

/**
 * Get All Categories
 */
export const getAllCategories = async () => {
  return await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

/**
 * Get Category By ID
 */
export const getCategoryById = async (id) => {
  return await prisma.category.findUnique({
    where: {
      id,
    },
  });
};

/**
 * Get Category By Code
 */
export const getCategoryByCode = async (code) => {
  return await prisma.category.findUnique({
    where: {
      code,
    },
  });
};

/**
 * Update Category
 */
export const updateCategory = async (id, data) => {
  return await prisma.category.update({
    where: {
      id,
    },
    data,
  });
};

/**
 * Delete Category
 */
export const deleteCategory = async (id) => {
  return await prisma.category.delete({
    where: {
      id,
    },
  });
};