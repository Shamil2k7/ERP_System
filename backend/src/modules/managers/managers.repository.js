import prisma from "../../config/prisma.js";

/**
 * Get all managers from dedicated Manager model
 */
const getAllManagers = async () => {
  return await prisma.manager.findMany({
    include: {
      roleRef: true,
      branch: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

/**
 * Get manager by ID from dedicated Manager model
 */
const getManagerById = async (id) => {
  return await prisma.manager.findUnique({
    where: { id },
    include: {
      roleRef: true,
      branch: true,
    },
  });
};

/**
 * Find manager by email
 */
const findManagerByEmail = async (email) => {
  return await prisma.manager.findUnique({
    where: { email: email.toLowerCase().trim() },
  });
};

/**
 * Find manager by phone
 */
const findManagerByPhone = async (phone) => {
  return await prisma.manager.findUnique({
    where: { phone: phone.trim() },
  });
};

/**
 * Find manager by employeeId
 */
const findManagerByEmployeeId = async (employeeId) => {
  return await prisma.manager.findUnique({
    where: { employeeId: employeeId.trim() },
  });
};

/**
 * Find or create role by name
 */
const findOrCreateRole = async (roleName) => {
  let role = await prisma.role.findFirst({
    where: { name: { equals: roleName.trim(), mode: "insensitive" } },
  });
  if (!role) {
    role = await prisma.role.create({ data: { name: roleName.trim() } });
  }
  return role;
};

/**
 * Create a manager in dedicated Manager table
 */
const createManager = async (data) => {
  return await prisma.manager.create({
    data,
    include: {
      roleRef: true,
      branch: true,
    },
  });
};

/**
 * Delete a manager by ID from Manager table
 */
const deleteManager = async (id) => {
  return await prisma.manager.delete({ where: { id } });
};

export {
  getAllManagers,
  getManagerById,
  findManagerByEmail,
  findManagerByPhone,
  findManagerByEmployeeId,
  findOrCreateRole,
  createManager,
  deleteManager,
};
