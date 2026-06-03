import { Router } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

router.post("/", verifyToken, createUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
