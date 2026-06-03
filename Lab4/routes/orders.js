import { Router } from "express";
import {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
} from "../controllers/orderController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

router.get("/:id", verifyToken, getOrder);
router.post("/", verifyToken, createOrder);
router.put("/:id", verifyToken, updateOrder);
router.delete("/:id", verifyToken, deleteOrder);

export default router;
