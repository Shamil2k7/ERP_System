import { Router } from "express";
import * as unitController from "./unit.controller.js";
import {
  createUnitValidation,
  updateUnitValidation,
} from "./unit.validation.js";

import validateRequest from "../../middlewares/validateRequest.js";

const router = Router();

router.post(
  "/",
  createUnitValidation,
  validateRequest,
  unitController.createUnit
);

router.get("/", unitController.getAllUnits);

router.get("/:id", unitController.getUnitById);

router.put(
  "/:id",
  updateUnitValidation,
  validateRequest,
  unitController.updateUnit
);

router.delete("/:id", unitController.deleteUnit);

export default router;
