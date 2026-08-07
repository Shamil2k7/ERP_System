import express from "express";
import {
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee
} from "./employees.controller.js";

const router = express.Router();

router.get("/", getEmployees);
router.get("/:id", getEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
