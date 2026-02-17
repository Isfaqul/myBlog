import type { NextFunction, Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import { validateLoginFormData, validateSignupFormData } from "../validation/auth.js";
import { hashPassword } from "../utils/util.js";
import { prisma } from "../lib/prisma.js";
import passport from "passport";
import type { User } from "../@types/auth.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const login = [
  validateLoginFormData,
  (req: Request, res: Response, next: NextFunction) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
      return res.status(400).json({ message: "Invalid data", errors: results.array() });
    }

    passport.authenticate("local", { session: false }, function (err: unknown, user: User, info: { message: string }) {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(403).json({ message: info.message });
      }

      // If the user has been verified, issue jwt token
      const token = jwt.sign({ sub: { id: user.id, name: user.name } }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.json({ message: "Successfully LoggedIn", accessToken: token });
    })(req, res, next);
  },
];

const signup = [
  validateSignupFormData,
  async (req: Request, res: Response, next: NextFunction) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
      return res.status(400).json({ message: "Invalid data", errors: results.array() });
    }

    const { name, username, password } = matchedData(req);
    const passwordHash = hashPassword(password);
    console.log(hashPassword);

    try {
      await prisma.user.create({
        data: {
          name: name,
          username: username,
          password: passwordHash,
        },
      });

      res.json({ message: "Successfully signed up!" });
    } catch (error) {
      next(error);
    }
  },
];

const checkSessionValidity = async (req: Request, res: Response) => {
  const header = req.headers.authorization;

  if (!header || typeof header !== "string") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!header.startsWith("Bearer")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return res.status(200).json({ message: "Token valid", valid: true });
  } catch (error) {
    return res.status(401).json({ message: "Token expired" });
  }
};

export { login, signup, checkSessionValidity };
