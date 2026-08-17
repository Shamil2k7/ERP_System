import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    include: { roleRef: true }
  });
  console.log("USERS:", JSON.stringify(users.map(u => ({
    id: u.id,
    fullName: u.fullName,
    email: u.email,
    role: u.role,
    roleRef: u.roleRef
  })), null, 2));

  const roles = await prisma.role.findMany();
  console.log("ROLES:", JSON.stringify(roles, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
