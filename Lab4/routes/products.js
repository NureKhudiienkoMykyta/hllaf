import { Router } from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProduct,
  getProductReviews,
} from "../controllers/productController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.get("/:id/reviews", getProductReviews);

router.post("/", verifyToken, createProduct);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

export default router;
