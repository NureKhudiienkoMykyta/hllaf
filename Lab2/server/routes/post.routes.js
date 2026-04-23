import { Router } from "express";
import {
  createPost,
  getPosts,
  getPost,
  getPostComments,
  createPostComment,
} from "../controllers/post.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

router.post("/", verifyToken, createPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/:postId/comments", getPostComments);
router.post("/:postId/comments", verifyToken, createPostComment);

export default router;
