import prisma from "../../config/prisma.js";

export const createAuditLog = async (data) => {
  return await prisma.auditLog.create({
    data,
  });
};


const buildWhereClause = ({ search, action, entity, userId, startDate, endDate }) => {
  const where = {};

  if (action && action.trim() !== "" && action !== "ALL") {
    where.action = { equals: action.trim(), mode: "insensitive" };
  }

  if (entity && entity.trim() !== "" && entity !== "ALL") {
    where.entity = { equals: entity.trim(), mode: "insensitive" };
  }

  if (userId && userId.trim() !== "") {
    where.userId = userId;
  }

  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) {
      where.createdAt.gte = new Date(startDate);
    }
    if (endDate) {
      where.createdAt.lte = new Date(endDate);
    }
  }

  if (search && search.trim() !== "") {
    const s = search.trim();
    where.OR = [
      { userName: { contains: s, mode: "insensitive" } },
      { userEmail: { contains: s, mode: "insensitive" } },
      { action: { contains: s, mode: "insensitive" } },
      { entity: { contains: s, mode: "insensitive" } },
      { entityId: { contains: s, mode: "insensitive" } },
    ];
  }

  return where;
};

export const findAuditLogs = async ({ search, action, entity, userId, startDate, endDate, skip = 0, take = 20 }) => {
  const where = buildWhereClause({ search, action, entity, userId, startDate, endDate });

  return await prisma.auditLog.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    skip: Number(skip),
    take: Number(take),
  });
};

export const countAuditLogs = async ({ search, action, entity, userId, startDate, endDate }) => {
  const where = buildWhereClause({ search, action, entity, userId, startDate, endDate });
  return await prisma.auditLog.count({ where });
};

export const findAuditLogById = async (id) => {
  return await prisma.auditLog.findUnique({
    where: { id },
  });
};


export const deleteAuditLog = async (id) => {
  return await prisma.auditLog.delete({
    where: { id },
  });
};
