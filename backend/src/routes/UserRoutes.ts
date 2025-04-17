import express, { Request, Response } from "express";
import { UserRole } from "../models/enums";
import { userService } from "../service/UserService";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
    const { name, email, role } = req.body;

    if (!Object.values(UserRole).includes(role as UserRole)) {
        res.status(400).json({ error: "Invalid user role" });
        return;
    }

    try {
        const newUser = userService.createUser(name, email, role as UserRole);
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/", (_req: Request, res: Response) => {
    const users = userService.getAllUsers();
    res.status(200).json(users);
});

router.get("/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = userService.getUserById(id);
    
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    
    res.status(200).json(user);
});

export default router;