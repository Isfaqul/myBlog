import { Router } from "express";
import { getAboutPageContent } from "../controllers/content.js";

const contentRouter = Router();

contentRouter.get("/about", getAboutPageContent);

export default contentRouter;
