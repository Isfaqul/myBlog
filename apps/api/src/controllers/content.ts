import type { NextFunction, Request, Response } from "express";
import { aboutMe, aboutThisPage, dislikes, likes } from "../../public/content/about.js";

export const getAboutPageContent = (_req: Request, res: Response, _next: NextFunction) => {
  res.json({ aboutMe: aboutMe, aboutThisPage: aboutThisPage, likes, dislikes });
};
