import { Assignment } from "../models/AssignmentModel";
import { Subject } from "../models/enums";
import { addAssignment, getAllAssignments, getAssignmentById, getAssignmentsByStudentId, getAssignmentsBySubject } from "../db/AssignmentsDB";

class AssignmentService {
  createAssignment(studentId: number, subject: Subject, title: string, content: string): Assignment {
    if (!title || !content) {
      throw new Error("Title and content are required");
    }
    
    return addAssignment(studentId, subject, title, content);
  }
  
  getAllAssignments(): Assignment[] {
    return getAllAssignments();
  }
  
  getAssignmentsBySubject(subject: Subject): Assignment[] {
    return getAssignmentsBySubject(subject);
  }

  getAssignmentsByStudentId(studentId: number): Assignment[] {
    return getAssignmentsByStudentId(studentId);
  }

  getAssignmentsByAssignmentId(studentId: number): Assignment | undefined {
    return getAssignmentById(studentId);
  }

  getGradesByStudentId(studentId: number): Assignment[] {
    const studentAssignments = getAssignmentsByStudentId(studentId);
    return studentAssignments.filter(assignment => assignment.grade !== undefined);
  }
  
  validateSubject(subject: any): boolean {
    return Object.values(Subject).includes(subject);
  }
}

export const assignmentService = new AssignmentService();