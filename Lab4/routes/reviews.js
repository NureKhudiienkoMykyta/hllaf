import { Router } from "express";
import {
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

router.post("/", verifyToken, createReview);
router.put("/:id", verifyToken, updateReview);
router.delete("/:id", verifyToken, deleteReview);

export default router;
