import { UserRole } from "./enums";

export interface User {
  id: number;
  createdAt: Date;
  name: string;
  email: string;
  role: UserRole;
}