import { Router } from "express";
import {
  createPost,
  getPosts,
  getPost,
  getPostComments,
  createPostComment,
  deletePost,
  updatePost,
} from "../controllers/post.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

router.post("/", verifyToken, createPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/:postId/comments", getPostComments);
router.post("/:postId/comments", verifyToken, createPostComment);
router.delete("/:id", verifyToken, deletePost);
router.put("/:id", verifyToken, updatePost);

export default router;
