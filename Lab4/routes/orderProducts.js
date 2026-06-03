import { Router } from "express";
import {
  createOrderProduct,
  updateOrderProduct,
  deleteOrderProduct,
} from "../controllers/orderProductController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

router.post("/", verifyToken, createOrderProduct);
router.put("/:orderId/:productId", verifyToken, updateOrderProduct);
router.delete("/:orderId/:productId", verifyToken, deleteOrderProduct);

export default router;
