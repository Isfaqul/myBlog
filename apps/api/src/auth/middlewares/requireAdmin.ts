import type { NextFunction, Request, Response } from "express";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user) return res.status(403).json({ message: "You are not authorized" });
  if (req.user.role !== "ADMIN") return res.status(403).json({ message: "You need elevated access" });
  next();
}
