import express, { NextFunction, Request, Response } from "express";
import { Subject, UserRole } from "../models/enums";
import { assignmentService } from "../service/AssignmentService";
import requireRole from "../middleware/requireRole";

const router = express.Router();

router.post("/", requireRole(UserRole.STUDENT), (req: Request, res: Response, next: NextFunction) => {
    const { subject, title, content, studentId } = req.body;

    // Validations
    if (!assignmentService.validateSubject(subject)) {
        res.status(400).json({ error: "Invalid subject" });
    }

    try {
        const newAssignment = assignmentService.createAssignment(
            studentId,
            subject as Subject,
            title,
            content
        );
        res.status(201).json(newAssignment);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/", (req: Request, res: Response) => {
    const subject = req.query.subject;
    const studentId = req.query.studentId && parseInt(req.query.studentId as string);

    // Validations
    if (subject && !assignmentService.validateSubject(subject)) {
        res.status(400).json({ error: "Invalid subject" });
    }
    
    if (subject) {
        const filteredAssignments = assignmentService.getAssignmentsBySubject(subject as Subject);
        res.status(200).json(filteredAssignments);
    } else if (studentId) {
        const filteredAssignments = assignmentService.getAssignmentsByStudentId(studentId);
        res.status(200).json(filteredAssignments);
    } else {
        const allAssignments = assignmentService.getAllAssignments();
        res.status(200).json(allAssignments);
    }
});

//get by assignment id
router.get("/:id", (req: Request, res: Response) => {
    const assignmentId = parseInt(req.params.id);
    
    if (isNaN(assignmentId)) {
        res.status(400).json({ error: "Invalid assignment ID" });
        return;
    }
    
    try {
        const assignment = assignmentService.getAssignmentsByAssignmentId(assignmentId);
        
        if (!assignment) {
            res.status(404).json({ error: "Assignment not found" });
            return;
        }
        
        res.status(200).json(assignment);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});


export default router;