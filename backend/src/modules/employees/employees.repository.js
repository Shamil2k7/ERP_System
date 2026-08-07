import prisma from "../../config/prisma.js";

const getAllEmployees = async () => {
  return await prisma.user.findMany({
    include: { role: true },
    orderBy: { createdAt: 'desc' }
  });
};

const getEmployeeById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    include: { role: true }
  });
};

const updateEmployee = async (id, data) => {
  return await prisma.user.update({
    where: { id },
    data,
    include: { role: true }
  });
};

const deleteEmployee = async (id) => {
  return await prisma.user.delete({
    where: { id }
  });
};

export {
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
};
