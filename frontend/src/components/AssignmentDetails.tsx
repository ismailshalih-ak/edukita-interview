// src/components/AssignmentDetails.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Assignment } from '../types';

interface AssignmentDetailsProps {
  assignment: Assignment;
}

const AssignmentDetails: React.FC<AssignmentDetailsProps> = ({ assignment }) => {
  const navigate = useNavigate();

  // Format date helper
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
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-medium text-gray-900">Assignment Details</h1>
        <span className={`px-2 py-1 text-xs rounded-full ${
          assignment.subject === 'math' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
        }`}>
          {assignment.subject.charAt(0).toUpperCase() + assignment.subject.slice(1)}
        </span>
      </div>
      
      <div className="px-6 py-4">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">{assignment.title}</h2>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <div>Created: {formatDate(assignment.createdAt)}</div>
            <div className="ml-4">Student: #{assignment.studentId}</div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-md font-medium mb-2 text-gray-700">Assignment Content:</h3>
          <div className="bg-gray-50 p-4 rounded whitespace-pre-wrap">{assignment.content}</div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 px-6 py-4">
        <button
          onClick={() => navigate('/assignments')}
          className="text-blue-500 hover:text-blue-700"
        >
          &larr; Back to Assignments
        </button>
      </div>
    </div>
  );
};

export default AssignmentDetails;