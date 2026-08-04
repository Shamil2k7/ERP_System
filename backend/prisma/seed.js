import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.customer.createMany({
    data: [
      {
        name: "John Mathew",
        phone: "9876500001",
        email: "john@example.com",
        address: "Kochi, Kerala",
        loyaltyId: "LOY001",
        creditLimit: 10000,
        currentBalance: 1500,
      },
      {
        name: "Aisha Rahman",
        phone: "9876500002",
        email: "aisha@example.com",
        address: "Calicut, Kerala",
        loyaltyId: "LOY002",
        creditLimit: 5000,
        currentBalance: 0,
      },
      {
        name: "Arun Kumar",
        phone: "9876500003",
        email: "arun@example.com",
        address: "Thrissur, Kerala",
        loyaltyId: "LOY003",
        creditLimit: 8000,
        currentBalance: 1200,
      },
      {
        name: "Nikhil Raj",
        phone: "9876500004",
        email: "nikhil@example.com",
        address: "Kannur, Kerala",
        loyaltyId: "LOY004",
        creditLimit: 12000,
        currentBalance: 500,
      },
      {
        name: "Fathima Noor",
        phone: "9876500005",
        email: "fathima@example.com",
        address: "Malappuram, Kerala",
        loyaltyId: "LOY005",
        creditLimit: 6000,
        currentBalance: 200,
      },
      {
        name: "Mohammed Ali",
        phone: "9876500006",
        email: "ali@example.com",
        address: "Palakkad, Kerala",
        loyaltyId: "LOY006",
        creditLimit: 9000,
        currentBalance: 1000,
      },
      {
        name: "Sneha Nair",
        phone: "9876500007",
        email: "sneha@example.com",
        address: "Trivandrum, Kerala",
        loyaltyId: "LOY007",
        creditLimit: 15000,
        currentBalance: 3500,
      },
      {
        name: "Rahul Das",
        phone: "9876500008",
        email: "rahul@example.com",
        address: "Kottayam, Kerala",
        loyaltyId: "LOY008",
        creditLimit: 7000,
        currentBalance: 400,
      },
      {
        name: "Anjali Menon",
        phone: "9876500009",
        email: "anjali@example.com",
        address: "Alappuzha, Kerala",
        loyaltyId: "LOY009",
        creditLimit: 9500,
        currentBalance: 800,
      },
      {
        name: "David Joseph",
        phone: "9876500010",
        email: "david@example.com",
        address: "Ernakulam, Kerala",
        loyaltyId: "LOY010",
        creditLimit: 11000,
        currentBalance: 0,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Customer seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });