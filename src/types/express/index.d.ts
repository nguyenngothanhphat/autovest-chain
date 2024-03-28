import AuthService from "../../services/auth/auth.service";

declare global {
    namespace Express {
      export interface Request {
        user: ReturnType<typeof AuthService['verifyToken']>;
      }
    }
}