import prisma from "../../config/prisma.js";


const getAllEmployees = async () => {
  return await prisma.user.findMany({
    include: {
      role: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getEmployeeById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      role: true,
    },
  });
};


const findEmployeeByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};


const findEmployeeByEmployeeId = async (employeeId) => {
  return await prisma.user.findUnique({
    where: {
      employeeId,
    },
  });
};



const findEmployeeByPhone = async (phone) => {
  return await prisma.user.findUnique({
    where: {
      phone,
    },
  });
};
const findRoleByName = async (roleName) => {
  let role = await prisma.role.findFirst({
    where: {
      name: {
        equals: roleName,
        mode: "insensitive",
      },
    },
  });

  if (!role) {
    role = await prisma.role.create({
      data: {
        name: roleName,
      },
    });
  }

  return role;
};


const createEmployee = async (data) => {
  return await prisma.user.create({
    data,
    include: {
      role: true,
    },
  });
};

const updateEmployee = async (id, data) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
    include: {
      role: true,
    },
  });
};

const deleteEmployee = async (id) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};


export {
  getAllEmployees,
  getEmployeeById,
  findEmployeeByEmail,
  findEmployeeByEmployeeId,
  findEmployeeByPhone,
  findRoleByName,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
