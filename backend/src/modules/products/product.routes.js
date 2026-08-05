import { Router } from "express";
import * as productController from "./product.controller.js";
import {
  createProductValidation,
  updateProductValidation,
} from "./product.validation.js";

import validateRequest from "../../middlewares/validateRequest.js";

const router = Router();

router.post(
  "/",
  createProductValidation,
  validateRequest,
  productController.createProduct
);

router.get("/", productController.getAllProducts);

router.get(
  "/search",
  productController.searchProducts
);

router.get(
  "/:id",
  productController.getProductById
);

router.put(
  "/:id",
  updateProductValidation,
  validateRequest,
  productController.updateProduct
);

router.delete(
  "/:id",
  productController.deleteProduct
);

export default router;