import express from "express";
import {
  getManagers,
  getManager,
  createManager,
  deleteManagerById,
} from "./managers.controller.js";

const router = express.Router();

router.get("/", getManagers);
router.get("/:id", getManager);
router.post("/", createManager);
router.delete("/:id", deleteManagerById);

export default router;
