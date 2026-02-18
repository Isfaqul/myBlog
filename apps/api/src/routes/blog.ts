import { Router } from "express";
import {
  deleteComment,
  deletePost,
  editComment,
  editPost,
  getPostById,
  listPosts,
  postComment,
  addPost,
  publishPost,
  unpublishPost,
} from "../controllers/blog.js";
import { requireLogin } from "../auth/middlewares/requireLogin.js";
import { requireAdmin } from "../auth/middlewares/requireAdmin.js";
import { optionalAuth } from "../auth/middlewares/optionalAuth.js";

const blogRouter = Router();

blogRouter.get("/", optionalAuth, listPosts);
blogRouter.post("/", requireLogin, requireAdmin, ...addPost);
blogRouter.post("/:postId/publish", requireLogin, requireAdmin, publishPost);
blogRouter.post("/:postId/unpublish", requireLogin, requireAdmin, unpublishPost);

blogRouter.get("/:postId", optionalAuth, getPostById);
blogRouter.put("/:postId", requireLogin, requireAdmin, editPost);
blogRouter.delete("/:postId", requireLogin, requireAdmin, deletePost);

blogRouter.post("/:postId/comments", requireLogin, ...postComment);
blogRouter.put("/:postId/comments/:commentId", requireLogin, editComment);
blogRouter.delete("/:postId/comments/:commentId", requireLogin, requireAdmin, deleteComment);

export default blogRouter;
