import { getAssignmentById, updateAssignment } from "../db/AssignmentsDB";
import { Assignment } from "../models/AssignmentModel";


class GradeService {
    createGrade(teacherId: number, assignmentId: number, grade: number, feedback: string): Assignment | null {
        if (grade < 0 || grade > 100) {
          throw new Error("Grade must be between a value of 0 and 100");
        }
        
        if (!assignmentId) {
          throw new Error("Assignment ID is required");
        }
        
        // First, get the assignment
        const assignment = getAssignmentById(assignmentId);
        if (!assignment) {
          throw new Error("Assignment not found");
        }
        
        // Update the assignment with grade information
        const updatedAssignment = updateAssignment(assignmentId, {
          grade,
          feedback,
          teacherId,
          gradedAt: new Date()
        });
        
        if (!updatedAssignment) {
          throw new Error("Failed to update assignment with grade");
        }
        
        // Return the updated assignment
        return updatedAssignment;
      }
}

export const gradeService = new GradeService();