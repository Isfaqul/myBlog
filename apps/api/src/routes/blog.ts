import { Router } from "express";
import { editComment, getPostById, listPosts, postComment } from "../controllers/blog.js";
import { requireLogin } from "../auth/middlewares/requireLogin.js";
import { optionalAuth } from "../auth/middlewares/optionalAuth.js";

const blogRouter = Router();

blogRouter.get("/", optionalAuth, listPosts);
blogRouter.get("/:postId", optionalAuth, getPostById);

blogRouter.post("/:postId/comments", requireLogin, ...postComment);
blogRouter.put("/:postId/comments/:commentId", requireLogin, editComment); // To implement

export default blogRouter;
