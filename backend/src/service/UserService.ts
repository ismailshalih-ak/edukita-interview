import { User } from "../models/UserModel";
import { UserRole } from "../models/enums";
import { addUser, getAllUsers, getUserById } from "../db/UsersDB";

class UserService {
  createUser(name: string, email: string, role: UserRole): User {
    if (!name || !email) {
      throw new Error("Name and email are required");
    }
    
    if (!this.isValidEmail(email)) {
      throw new Error("Invalid email format");
    }
    
    return addUser(name, email, role);
  }
  
  getAllUsers(): User[] {
    return getAllUsers();
  }
  
  getUserById(id: number): User | null {
    const user = getUserById(id);
    return user || null;
  }
  
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export const userService = new UserService();