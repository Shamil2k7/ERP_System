const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Upload Folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ERP Backend API Running Successfully",
  });
});

// Routes
// app.use("/api/auth", require("./modules/auth/auth.routes"));
// app.use("/api/products", require("./modules/products/products.routes"));
// app.use("/api/users", require("./modules/users/users.routes"));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;