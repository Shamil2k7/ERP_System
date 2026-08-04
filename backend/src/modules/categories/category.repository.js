import prisma from "../../config/prisma.js";
/**
 * Create Category
 */
export const createCategory = async (data) => {
  return await prisma.category.create({
    data,
  });
};


export const getAllCategories = async () => {
  return await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};


export const getCategoryById = async (id) => {
  return await prisma.category.findUnique({
    where: {
      id,
    },
  });
};


export const getCategoryByCode = async (code) => {
  return await prisma.category.findUnique({
    where: {
      code,
    },
  });
};


export const updateCategory = async (id, data) => {
  return await prisma.category.update({
    where: {
      id,
    },
    data,
  });
};


export const deleteCategory = async (id) => {
  return await prisma.category.delete({
    where: {
      id,
    },
  });
};