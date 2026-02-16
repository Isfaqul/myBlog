import type { UserOnRequestObj } from "./auth.js";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
  }
  namespace Express {
    interface User extends UserOnRequestObj {}
  }
}

export {};
