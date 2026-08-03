import express from "express";
import * as controller from "./customers.controller.js";

const router = express.Router();

router.post("/", controller.createCustomer);
router.get("/", controller.getCustomers);

export default router;