import type { NextFunction, Request, Response } from "express";
import passport from "passport";
import type { UserOnRequestObj } from "../../@types/auth.js";

export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  passport.authenticate("jwt", { session: false }, (err: unknown, user: UserOnRequestObj) => {
    if (err) {
      return next(err);
    }

    if (user) {
      req.user = user;
    }

    return next();
  })(req, res, next);
}
