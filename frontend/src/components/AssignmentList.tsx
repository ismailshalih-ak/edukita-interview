import { Assignment } from "../types";

interface AssignmentListProps {
    assignments: Assignment[];
    onViewDetails: (assignmentId: number) => void;
}

const AssignmentList: React.FC<AssignmentListProps> = ({ 
  assignments,
  onViewDetails
}) => {
  // Format date to a readable format
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Get subject display name (with first letter capitalized)
  const getSubjectDisplayName = (subject: string): string => {
    return subject.charAt(0).toUpperCase() + subject.slice(1).toLowerCase();
  };

  // Get the color class based on subject
  const getSubjectColorClass = (subject: string): string => {
    const colorMap: Record<string, string> = {
      ['math']: 'bg-blue-100 text-blue-800',
      ['english']: 'bg-green-100 text-green-800',
    };
    
    return colorMap[subject] || 'bg-gray-100 text-gray-800';
  };

  if (assignments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
        <p>No assignments found.</p>
        <p className="mt-2 text-sm">Try selecting a different subject or remove filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {assignments.map(assignment => (
          <li key={assignment.id} className="hover:bg-gray-50 transition-colors">
            <div className="p-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900">{assignment.title}</h3>
                  
                  {/* Graded/Ungraded Tag */}
                  <span className={`ml-3 px-2 py-0.5 text-xs rounded-full ${
                    assignment.grade !== undefined 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {assignment.grade !== undefined ? 'Graded' : 'Ungraded'}
                  </span>
                  
                  {/* Show grade if available */}
                  {assignment.grade !== undefined && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">
                      Grade: {assignment.grade}/100
                    </span>
                  )}
                </div>
                
                <span className={`px-2 py-1 text-xs rounded-full ${getSubjectColorClass(assignment.subject)}`}>
                  {getSubjectDisplayName(assignment.subject)}
                </span>
              </div>
              
              <div className="mt-2 text-sm text-gray-500">
                {assignment.content.length > 100 
                  ? `${assignment.content.substring(0, 100)}...` 
                  : assignment.content}
              </div>
              
              <div className="mt-3 flex justify-between items-center">
                <div className="flex items-center text-xs text-gray-500">
                  <span>Created: {formatDate(assignment.createdAt)}</span>
                  
                  {assignment.gradedAt && (
                    <span className="ml-3">
                      Graded: {formatDate(assignment.gradedAt)}
                    </span>
                  )}
                </div>
                
                <button
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                  onClick={() => onViewDetails(assignment.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentList;