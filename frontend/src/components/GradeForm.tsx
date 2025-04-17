import React, { useState } from 'react';
import { Assignment, User } from '../types';

interface GradeFormProps {
  assignment: Assignment;
  user: User | null;
  onAssignmentUpdated: (updatedAssignment: Assignment) => void;
}

const GradeForm: React.FC<GradeFormProps> = ({ assignment, user, onAssignmentUpdated }) => {
  const [grade, setGrade] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [isSubmittingGrade, setIsSubmittingGrade] = useState<boolean>(false);
  const [gradeError, setGradeError] = useState<string | null>(null);

  const handleGradeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!assignment) return;

    // Validate grade
    const numericGrade = parseFloat(grade);
    if (isNaN(numericGrade) || numericGrade < 0 || numericGrade > 100) {
      setGradeError('Grade must be a number between 0 and 100.');
      return;
    }

    // Validate feedback
    if (!feedback.trim()) {
      setGradeError('Feedback is required.');
      return;
    }

    try {
      setIsSubmittingGrade(true);
      setGradeError(null);

      const apiUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${apiUrl}/grades`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assignmentId: assignment.id,
          grade: numericGrade,
          feedback,
          teacherId: user?.id
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `Error: ${response.status}`);
      }

      const updatedAssignment = await response.json();

      // Update local state with graded assignment
      onAssignmentUpdated({
        ...updatedAssignment,
        createdAt: new Date(updatedAssignment.createdAt),
        gradedAt: new Date(updatedAssignment.gradedAt)
      });

    } catch (err) {
      console.error('Failed to submit grade:', err);
      setGradeError(err instanceof Error ? err.message : 'Failed to submit grade');
    } finally {
      setIsSubmittingGrade(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="bg-green-50 px-6 py-4 border-b border-green-100">
        <h2 className="text-lg font-medium text-green-800">Grade Assignment</h2>
      </div>

      <div className="px-6 py-4">
        {gradeError && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md text-sm">
            {gradeError}
          </div>
        )}

        <form onSubmit={handleGradeSubmit}>
          <div className="mb-4">
            <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
              Grade (0-100)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              id="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Enter grade (0-100)"
              required
              disabled={isSubmittingGrade}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
              Feedback
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              rows={6}
              placeholder="Provide feedback to the student..."
              required
              disabled={isSubmittingGrade}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmittingGrade}
          >
            {isSubmittingGrade ? 'Submitting...' : 'Submit Grade'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GradeForm;