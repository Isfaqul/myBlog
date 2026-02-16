import passport from "passport";

export const requireLogin = passport.authenticate("jwt", { session: false });
