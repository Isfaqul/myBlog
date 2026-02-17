import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "../lib/prisma.js";
import { comparePassword } from "../utils/util.js";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

const JWT_SECRET = process.env.JWT_SECRET;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!user || !comparePassword(password, user.password)) return done(null, false, { message: "Bad credentials" });

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }),
);

const JWT_OPTIONS = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

type JwtPayload = {
  id: number;
  color: string;
  name: string;
  role: "ADMIN" | "USER";
};

passport.use(
  new JwtStrategy(JWT_OPTIONS, async (payload: { sub: JwtPayload }, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: payload.sub.id,
        },
        select: {
          id: true,
          name: true,
          username: true,
          role: true,
          color: true,
        },
      });

      if (!user) return done(null, false);

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }),
);

export {};
