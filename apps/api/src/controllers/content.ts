import type { Request, Response } from "express";
import { aboutMe, aboutThisPage } from "../../public/content/about.js";

export const getAboutPageContent = (req: Request, res: Response) => {
  res.json({ aboutMe: aboutMe, aboutThisPage: aboutThisPage });
};
