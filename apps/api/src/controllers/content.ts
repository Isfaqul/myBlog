import type { Response } from "express";
import { aboutMe, aboutThisPage, dislikes, likes } from "../../public/content/about.js";

export const getAboutPageContent = (res: Response) => {
  res.json({ aboutMe: aboutMe, aboutThisPage: aboutThisPage, likes, dislikes });
};
