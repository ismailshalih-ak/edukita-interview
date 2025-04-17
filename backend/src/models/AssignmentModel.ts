import { Subject } from "./enums";

export interface Assignment {
  id: number;
  studentId: number;
  subject: Subject;
  title: string;
  content: string;
  createdAt: Date;
  teacherId?: number;
  grade?: number;
  feedback?: string;
  gradedAt?: Date;
}