import React from 'react';
import { Assignment } from '../types';

interface GradeDetailsProps {
  assignment: Assignment;
}

const GradeDetails: React.FC<GradeDetailsProps> = ({ assignment }) => {
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className={`px-6 py-4 border-b ${
        assignment.grade !== undefined && assignment.grade >= 70 ? 'bg-green-50 border-green-100' :
          assignment.grade !== undefined && assignment.grade >= 50 ? 'bg-yellow-50 border-yellow-100' :
            'bg-red-50 border-red-100'
      }`}>
        <h2 className="text-lg font-medium">
          <span className={
            assignment.grade !== undefined && assignment.grade >= 70 ? 'text-green-800' :
            assignment.grade !== undefined && assignment.grade >= 50 ? 'text-yellow-800' :
                'text-red-800'
          }>
            Grade: {assignment.grade}/100
          </span>
        </h2>
      </div>

      <div className="px-6 py-4">
        <div className="mb-4">
          <h3 className="text-md font-medium mb-2 text-gray-700">Feedback:</h3>
          <div className="bg-gray-50 p-4 rounded whitespace-pre-wrap">
            {assignment.feedback || "No feedback provided."}
          </div>
        </div>

        <div className="text-sm text-gray-500 mt-4">
          <div>Graded by: Teacher #{assignment.teacherId}</div>
          {assignment.gradedAt && (
            <div className="mt-1">Graded on: {formatDate(assignment.gradedAt)}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GradeDetails;