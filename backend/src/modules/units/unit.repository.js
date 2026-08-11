import prisma from "../../config/prisma.js";

export const createUnit = async (data) => {
  return await prisma.unit.create({
    data,
  });
};

export const getAllUnits = async () => {
  return await prisma.unit.findMany({
    include: {
      products: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getUnitById = async (id) => {
  return await prisma.unit.findUnique({
    where: {
      id,
    },
  });
};

export const getUnitByName = async (name) => {
  return await prisma.unit.findUnique({
    where: {
      name,
    },
  });
};

export const getUnitByShortName = async (shortName) => {
  return await prisma.unit.findUnique({
    where: {
      shortName,
    },
  });
};

export const updateUnit = async (id, data) => {
  return await prisma.unit.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteUnit = async (id) => {
  return await prisma.unit.delete({
    where: {
      id,
    },
  });
};
