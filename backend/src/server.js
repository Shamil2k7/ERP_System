require("dotenv").config();

const prisma = require("./config/prisma");
const app = require("./app");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Database Connected");

    app.listen(PORT, () => {
      console.log(`🚀 ERP Server Running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error);
    process.exit(1);
  }
}

startServer();