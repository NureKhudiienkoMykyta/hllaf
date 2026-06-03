import { Router } from "express";
import {
  createProductCategory,
  deleteProductCategory,
} from "../controllers/productCategoryController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

router.post("/", verifyToken, createProductCategory);
router.delete("/:productId/:categoryId", verifyToken, deleteProductCategory);

export default router;
