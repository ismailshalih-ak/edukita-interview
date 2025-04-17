import { UserRole } from "../models/enums";
import { User } from "../models/UserModel";

let users: User[] = [{
    id:1,
    name: 'test teacher',
    email: 'teacher1@email.com',
    role: 'teacher' as UserRole,
    createdAt: new Date(),
},
{
    id:2,
    name: 'test student',
    email: 'student1@email.com',
    role: 'student' as UserRole,
    createdAt: new Date(),
},
{
    id:3,
    name: 'test student 2',
    email: 'student2@email.com',
    role: 'student' as UserRole,
    createdAt: new Date(),
}
];

export const addUser = (
    name: string, 
    email: string, 
    role: UserRole,
  ): User => {
    const newUser: User = {
      id: users.length + 1,
      name,
      email,
      role,
      createdAt: new Date(),
    };
    
    users.push(newUser);
    return newUser;
  };

export const getAllUsers = (): User[] => {
    return [...users];
};

export const getUserById = (id: number): User | undefined => {
    return users.find(user => user.id === id);
};