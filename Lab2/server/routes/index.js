import { Router } from "express";
import postRouter from "./post.routes.js";
import authRouter from "./auth.routes.js";
import categoryRouter from "./category.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/post", postRouter);
router.use("/category", categoryRouter);

export default router;
