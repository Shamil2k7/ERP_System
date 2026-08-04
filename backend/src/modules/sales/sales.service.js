import salesRepository from "./sales.repository.js";
import SalesSchema from "./sales.schema.js";

class SalesService {
  // ===================================
  // Create Sales Order
  // ===================================
  async createSalesOrder(data) {
    // Check duplicate order number
    const existingOrder = await salesRepository.findByOrderNumber(
      data.orderNumber
    );

    if (existingOrder) {
      throw new Error("Sales Order Number already exists.");
    }

    // Calculate Net Amount
    const totalAmount = Number(data.totalAmount);
    const taxAmount = Number(data.taxAmount || 0);
    const discountAmount = Number(data.discountAmount || 0);

    const netAmount = totalAmount + taxAmount - discountAmount;

    // Prepare data
    const salesData = new SalesSchema({
      ...data,
      netAmount,
    });

    return await salesRepository.create(salesData);
  }

  // ===================================
  // Get All Sales Orders
  // ===================================
  async getSalesOrders() {
    return await salesRepository.findAll();
  }

  // ===================================
  // Get Sales Order By ID
  // ===================================
  async getSalesOrderById(id) {
    const sales = await salesRepository.findById(id);

    if (!sales) {
      throw new Error("Sales Order not found.");
    }

    return sales;
  }

  // ===================================
  // Update Sales Order
  // ===================================
  async updateSalesOrder(id, data) {
    const sales = await salesRepository.findById(id);

    if (!sales) {
      throw new Error("Sales Order not found.");
    }

    const totalAmount = Number(data.totalAmount);
    const taxAmount = Number(data.taxAmount || 0);
    const discountAmount = Number(data.discountAmount || 0);

    const netAmount = totalAmount + taxAmount - discountAmount;

    return await salesRepository.update(id, {
      ...data,
      netAmount,
    });
  }

  // ===================================
  // Delete Sales Order
  // ===================================
  async deleteSalesOrder(id) {
    const sales = await salesRepository.findById(id);

    if (!sales) {
      throw new Error("Sales Order not found.");
    }

    return await salesRepository.delete(id);
  }

  // ===================================
  // Update Status
  // ===================================
  async updateOrderStatus(id, status) {
    const sales = await salesRepository.findById(id);

    if (!sales) {
      throw new Error("Sales Order not found.");
    }

    const allowedStatus = [
      "DRAFT",
      "CONFIRMED",
      "INVOICED",
      "CANCELLED",
    ];

    if (!allowedStatus.includes(status)) {
      throw new Error("Invalid Order Status.");
    }

    return await salesRepository.updateStatus(id, status);
  }

  // ===================================
  // Search By Customer
  // ===================================
  async getCustomerOrders(customerId) {
    return await salesRepository.findByCustomer(customerId);
  }

  // ===================================
  // Search By Branch
  // ===================================
  async getBranchOrders(branchId) {
    return await salesRepository.findByBranch(branchId);
  }

  // ===================================
  // Search By Status
  // ===================================
  async getStatusOrders(status) {
    return await salesRepository.findByStatus(status);
  }
}

export default new SalesService();