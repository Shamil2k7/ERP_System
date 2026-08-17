import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");

  // 1. Create Default Role
  const roleName = "Admin";
  let role = await prisma.role.findFirst({
    where: { name: roleName },
  });
  if (!role) {
    role = await prisma.role.create({
      data: { name: roleName },
    });
    console.log(`Created role: ${roleName}`);
  }

  // 2. Create Default Branch (matching the POS page hardcoded UUID)
  const branchId = "00000000-0000-0000-0000-000000000000";
  let branch = await prisma.branch.findUnique({
    where: { id: branchId },
  });
  if (!branch) {
    branch = await prisma.branch.create({
      data: {
        id: branchId,
        name: "Main Branch",
        code: "MB01",
        address: "ERP Head Office",
        isActive: true,
      },
    });
    console.log("Created default Main Branch");
  }

  // 3. Create Default User (Admin)
  const email = "admin@erp.com";
  let user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    const passwordHash = await bcrypt.hash("admin123", 10);
    user = await prisma.user.create({
      data: {
        fullName: "Admin User",
        email,
        employeeId: "EMP001",
        phone: "1234567890",
        passwordHash,
        plainPassword: "admin123",
        isVerified: true,
        role: "Admin",
        roleId: role.id,
        branchId: branch.id,
      },
    });
    console.log(`Created admin user: ${email} / admin123`);
  }

  // 4. Create Category
  let category = await prisma.category.findFirst({
    where: { code: "GEN01" },
  });
  if (!category) {
    category = await prisma.category.create({
      data: {
        name: "General",
        code: "GEN01",
        description: "General category",
        status: "ACTIVE",
      },
    });
    console.log("Created category: General");
  }

  // 5. Create Brand
  let brand = await prisma.brand.findFirst({
    where: { name: "Generic" },
  });
  if (!brand) {
    brand = await prisma.brand.create({
      data: {
        name: "Generic",
        description: "Generic brand",
        status: "ACTIVE",
      },
    });
    console.log("Created brand: Generic");
  }

  // 6. Create Unit
  let unit = await prisma.unit.findFirst({
    where: { code: "PCS" },
  });
  if (!unit) {
    unit = await prisma.unit.create({
      data: {
        name: "Pieces",
        code: "PCS",
        status: "ACTIVE",
      },
    });
    console.log("Created unit: Pieces");
  }

  // 7. Create Customer (Walk-in Customer)
  let customer = await prisma.customer.findFirst({
    where: { phone: "9999999999" },
  });
  if (!customer) {
    customer = await prisma.customer.create({
      data: {
        name: "Walk-in Customer",
        phone: "9999999999",
        email: "walkin@erp.com",
        branchId: branchId,
      },
    });
    console.log("Created customer: Walk-in Customer");
  }

  // 8. Create Product
  let product = await prisma.product.findFirst({
    where: { sku: "PROD-TEST" },
  });
  if (!product) {
    product = await prisma.product.create({
      data: {
        name: "Test Laptop",
        sku: "PROD-TEST",
        description: "A high-performance test laptop",
        category: { connect: { id: category.id } },
        brand: { connect: { id: brand.id } },
        unit: { connect: { id: unit.id } },
        sellingPrice: 15000,
        costPrice: 10000,
        status: "ACTIVE",
      },
    });
    console.log("Created product: Test Laptop");
  }

  // 9. Create Warehouse
  let warehouse = await prisma.warehouse.findFirst({
    where: { code: "WH-MAIN" },
  });
  if (!warehouse) {
    warehouse = await prisma.warehouse.create({
      data: {
        name: "Main Warehouse",
        code: "WH-MAIN",
        status: "ACTIVE",
      },
    });
    console.log("Created warehouse: Main Warehouse");
  }

  // 10. Create Inventory
  let inventory = await prisma.inventory.findUnique({
    where: {
      productId_warehouseId: {
        productId: product.id,
        warehouseId: warehouse.id,
      },
    },
  });
  if (!inventory) {
    inventory = await prisma.inventory.create({
      data: {
        product: { connect: { id: product.id } },
        warehouse: { connect: { id: warehouse.id } },
        quantity: 100,
        minimumStock: 10,
        maximumStock: 1000,
        reorderLevel: 20,
      },
    });
    console.log("Created inventory for Test Laptop with quantity 100");
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
