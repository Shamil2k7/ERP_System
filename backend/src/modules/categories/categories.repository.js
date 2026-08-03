// src/modules/category/category.repository.js

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class CategoryRepository {
  async create(data) {
    return await prisma.category.create({
      data,
    });
  }

  async findAll({
    search,
    status,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    order = "desc",
  }) {
    const skip = (page - 1) * limit;

    const where = {};

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          code: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    if (status !== undefined) {
      where.status = status === "active";
    }

    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: {
          [sortBy]: order,
        },
      }),

      prisma.category.count({
        where,
      }),
    ]);

    return {
      categories,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id) {
    return await prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  async findByName(name) {
    return await prisma.category.findFirst({
      where: {
        name,
      },
    });
  }

  async findByCode(code) {
    return await prisma.category.findFirst({
      where: {
        code,
      },
    });
  }

  async update(id, data) {
    return await prisma.category.update({
      where: {
        id,
      },
      data,
    });
  }

  async updateStatus(id, status) {
    return await prisma.category.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }

  async delete(id) {
    return await prisma.category.delete({
      where: {
        id,
      },
    });
  }
}

module.exports = new CategoryRepository();