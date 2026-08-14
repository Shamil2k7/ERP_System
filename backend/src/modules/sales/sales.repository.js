import prisma from "../../config/prisma.js";

class SalesRepository {
  // ===============================
  // Create Sales Order
  // ===============================
  async create(data) {
    return await prisma.salesOrder.create({
      data,
    });
  }

  // ===============================
  // Get All Sales Orders
  // ===============================
  async findAll() {
    const orders = await prisma.salesOrder.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    
    return await Promise.all(
      orders.map(async (order) => {
        let customerName = "Walk-in Customer";
        if (order.customerId) {
          const customer = await prisma.customer.findUnique({
            where: { id: order.customerId },
            select: { name: true }
          });
          if (customer) {
            customerName = customer.name;
          }
        }
        return {
          ...order,
          customerName
        };
      })
    );
  }

  // ===============================
  // Get Sales Order By ID
  // ===============================
  async findById(id) {
    const order = await prisma.salesOrder.findUnique({
      where: { id },
    });
    
    if (!order) return null;
    
    let customerName = "Walk-in Customer";
    let customerPhone = "";
    let customerEmail = "";
    if (order.customerId) {
      const customer = await prisma.customer.findUnique({
        where: { id: order.customerId },
        select: { name: true, phone: true, email: true }
      });
      if (customer) {
        customerName = customer.name;
        customerPhone = customer.phone || "";
        customerEmail = customer.email || "";
      }
    }
    
    return {
      ...order,
      customerName,
      customerPhone,
      customerEmail
    };
  }

  // ===============================
  // Find By Order Number
  // ===============================
  async findByOrderNumber(orderNumber) {
    return await prisma.salesOrder.findUnique({
      where: {
        orderNumber,
      },
    });
  }

  // ===============================
  // Find By Customer
  // ===============================
  async findByCustomer(customerId) {
    return await prisma.salesOrder.findMany({
      where: {
        customerId,
      },
      orderBy: {
        orderDate: "desc",
      },
    });
  }

  // ===============================
  // Find By Branch
  // ===============================
  async findByBranch(branchId) {
    return await prisma.salesOrder.findMany({
      where: {
        branchId,
      },
      orderBy: {
        orderDate: "desc",
      },
    });
  }

  // ===============================
  // Find By Status
  // ===============================
  async findByStatus(status) {
    return await prisma.salesOrder.findMany({
      where: {
        status,
      },
      orderBy: {
        orderDate: "desc",
      },
    });
  }

  // ===============================
  // Update Sales Order
  // ===============================
  async update(id, data) {
    return await prisma.salesOrder.update({
      where: {
        id,
      },
      data,
    });
  }

  // ===============================
  // Update Status
  // ===============================
  async updateStatus(id, status) {
    return await prisma.salesOrder.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }

  // ===============================
  // Delete Sales Order
  // ===============================
  async delete(id) {
    return await prisma.salesOrder.delete({
      where: {
        id,
      },
    });
  }

  // ===============================
  // Count Orders
  // ===============================
  async count() {
    return await prisma.salesOrder.count();
  }
}

export default new SalesRepository();