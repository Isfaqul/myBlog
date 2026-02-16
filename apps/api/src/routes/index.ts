import { Router, type NextFunction, type Request, type Response } from "express";
import blogRouter from "./blog.js";
import authRouter from "./auth.js";
import globalErrorHandler from "../controllers/globalErrorHandler.js";

const router = Router();

router.use("/blog", blogRouter);
router.use("/auth", authRouter);

// 404 Handler
router.use((req: Request, res: Response, next: NextFunction) => {
  next(new Error("No resources found. Invalid URL."));
});

// Global ErrorHandler
router.use("/", globalErrorHandler);

export default router;
