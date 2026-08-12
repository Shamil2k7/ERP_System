import prisma from "../../config/prisma.js";

/**
 * Get all designations
 */
const getAllDesignations = async () => {
  return await prisma.designation.findMany({
    include: {
      department: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

/**
 * Get designation by ID
 */
const getDesignationById = async (id) => {
  return await prisma.designation.findUnique({
    where: { id },
    include: {
      department: true,
    },
  });
};

/**
 * Get designation by name
 */
const getDesignationByName = async (name) => {
  return await prisma.designation.findUnique({
    where: { name: name.trim() },
  });
};

/**
 * Get designation by code
 */
const getDesignationByCode = async (code) => {
  return await prisma.designation.findUnique({
    where: { code: code.trim() },
  });
};

/**
 * Create new designation
 */
const createDesignation = async (data) => {
  return await prisma.designation.create({
    data,
    include: {
      department: true,
    },
  });
};

/**
 * Update designation
 */
const updateDesignation = async (id, data) => {
  return await prisma.designation.update({
    where: { id },
    data,
    include: {
      department: true,
    },
  });
};

/**
 * Delete designation
 */
const deleteDesignation = async (id) => {
  return await prisma.designation.delete({
    where: { id },
  });
};

export {
  getAllDesignations,
  getDesignationById,
  getDesignationByName,
  getDesignationByCode,
  createDesignation,
  updateDesignation,
  deleteDesignation,
};
