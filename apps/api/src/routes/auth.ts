import { Router } from "express";
import { login, signup, checkSessionValidity } from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/signup", ...signup);
authRouter.post("/login", ...login);
authRouter.get("/me", checkSessionValidity);

export default authRouter;
