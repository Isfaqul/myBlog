import type { Request, Response } from "express";
import { aboutMe, aboutThisPage, dislikes, likes } from "../../public/content/about.js";

export const getAboutPageContent = (req: Request, res: Response) => {
  res.json({ aboutMe: aboutMe, aboutThisPage: aboutThisPage, likes, dislikes });
};
