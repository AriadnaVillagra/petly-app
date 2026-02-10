// src/interfaces/http/types.ts

export type Param<T extends string> = {
  [K in T]: string;
};

declare global {
  namespace Express {
    interface Request {
      auth?: {
        sub: string;
        email: string;
        name?: string;
      };
    }
  }
}
