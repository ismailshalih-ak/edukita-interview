export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface Assignment {
    id: number;
    studentId: number;
    subject: string;
    title: string;
    content: string;
    createdAt: Date;
    teacherId?: number;
    grade?: number;
    feedback?: string;
    gradedAt?: Date;
}

export enum Subject {
    ENGLISH = "english",
    MATH = "math",
}