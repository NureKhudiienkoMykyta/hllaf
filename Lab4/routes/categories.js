import { Router } from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
} from "../controllers/categoryController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

router.get("/", getCategories);
router.post("/", verifyToken, createCategory);
router.put("/:id", verifyToken, updateCategory);
router.delete("/:id", verifyToken, deleteCategory);

export default router;
