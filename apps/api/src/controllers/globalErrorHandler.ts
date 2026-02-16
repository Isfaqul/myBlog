import { Prisma } from "../../generated/prisma/client.js";
import type { NextFunction, Request, Response } from "express";

const globalErrorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error(error);
    return res.status(500).json({ message: "Database error." });
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    console.error(error);
    return res.status(500).json({ message: "Unknown database error." });
  }

  if (typeof error === "string") {
    console.error(error);
    return res.status(400).json({ message: error });
  }

  if (error instanceof Error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }

  console.error(error);
  return res.status(500).json({ message: "An unknown error occurred." });
};

export default globalErrorHandler;
