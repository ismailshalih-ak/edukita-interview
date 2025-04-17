import { Assignment } from "../models/AssignmentModel";
import { Subject } from "../models/enums";

let assignments: Assignment[] = [{
    id: 1,
    studentId: 2,
    title: 'Math test 1',
    content: 'math content',
    subject: Subject.MATH,
    createdAt: new Date()
},
{
    id: 2,
    studentId: 2,
    title: 'English test 1',
    content: 'english content',
    subject: Subject.ENGLISH,
    createdAt: new Date()
}];

export const addAssignment = (
  studentId: number,
  subject: Subject,
  title: string,
  content: string
): Assignment => {
  const newAssignment: Assignment = {
    id: assignments.length + 1,
    studentId,
    subject,
    title,
    content,
    createdAt: new Date(),
  };
  
  assignments.push(newAssignment);
  return newAssignment;
};

export const updateAssignment = (
  id: number, 
  updates: Partial<Assignment>
): Assignment | undefined => {
  const index = assignments.findIndex(a => a.id === id);
  if (index === -1) return undefined;
  
  assignments[index] = { ...assignments[index], ...updates };
  return assignments[index];
};

export const getAssignmentById = (id: number): Assignment | undefined => {
  return assignments.find(assignment => assignment.id === id);
};

export const getAllAssignments = (): Assignment[] => {
  return [...assignments];
};

export const getAssignmentsBySubject = (subject: Subject): Assignment[] => {
  return assignments.filter(assignment => assignment.subject === subject);
};

export const getAssignmentsByStudentId = (studentId: number): Assignment[] => {
  return assignments.filter(assignment => assignment.studentId === studentId);
};

export const getGradedAssignments = (): Assignment[] => {
  return assignments.filter(assignment => assignment.grade !== undefined);
};

export const getUngradedAssignments = (): Assignment[] => {
  return assignments.filter(assignment => assignment.grade === undefined);
};