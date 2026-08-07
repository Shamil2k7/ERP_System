import express from "express";

import {
  addEmployee,
} from "./employee.controller.js";

import {
  validateAddEmployee,
} from "./employee.validation.js";

const router = express.Router();

console.log("✅ Employee Routes Loaded");

// Test Route
router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Employee Route Working",
  });
});

// Add Employee
router.post(
  "/add",
  validateAddEmployee,
  addEmployee
);

export default router;