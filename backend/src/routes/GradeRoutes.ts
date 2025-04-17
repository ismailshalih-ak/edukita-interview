import express, { Request, Response } from "express";
import { gradeService } from "../service/GradeService";
import { assignmentService } from "../service/AssignmentService";
import requireRole from "../middleware/requireRole";
import { UserRole } from "../models/enums";

const router = express.Router();

router.post("/", requireRole(UserRole.TEACHER), (req: Request, res: Response) => {
    const { assignmentId, grade, feedback } = req.body;
    
    try {
        if (!assignmentId || grade === undefined) {
            res.status(400).json({ error: "Assignment ID and grade are required" });
            return;
        }
        
        const newGrade = gradeService.createGrade(
            1, // TODO: replace with real teacher ID from auth
            assignmentId,
            grade,
            feedback || ""
        );
        
        res.status(201).json(newGrade);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/:studentId", requireRole(UserRole.STUDENT), (req: Request, res: Response) => {
    try {
        const studentId = parseInt(req.params.studentId);
        
        if (isNaN(studentId)) {
            res.status(400).json({ error: "Invalid student ID" });
            return;
        }
        
        const studentGrades = assignmentService.getGradesByStudentId(studentId);
        res.status(200).json(studentGrades);
    } catch (error: any) {
        res.status(500).json({ error: "Failed to retrieve grades" });
    }
});

export default router;