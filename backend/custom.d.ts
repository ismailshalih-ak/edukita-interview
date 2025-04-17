import { User } from "./src/models/UserModel";

declare global {
    namespace Express {
      export interface Request {
        language?: Language;
        user?: User;
      }
    }
}