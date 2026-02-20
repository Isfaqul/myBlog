import { Router } from "express";
import { requireLogin } from "../auth/middlewares/requireLogin.js";
import { requireAdmin } from "../auth/middlewares/requireAdmin.js";
import { addPost, deleteComment, deletePost, editPost, publishPost, unpublishPost } from "../controllers/blog.js";

const adminRouter = Router();

// Post Routes
adminRouter.post("/blog", requireLogin, requireAdmin, ...addPost);
adminRouter.post("/blog/:postId/publish", requireLogin, requireAdmin, publishPost);
adminRouter.post("/blog/:postId/unpublish", requireLogin, requireAdmin, unpublishPost);
adminRouter.put("/blog/:postId", requireLogin, requireAdmin, editPost);
adminRouter.delete("/blog/:postId", requireLogin, requireAdmin, deletePost);

// Comment Routes
adminRouter.delete("/blog/:postId/comments/:commentId", requireLogin, requireAdmin, deleteComment);

export default adminRouter;
