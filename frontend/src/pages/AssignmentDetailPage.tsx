import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Assignment, User } from '../types';
import DashboardHeader from '../components/DashboardHeader';
import AssignmentDetails from '../components/AssignmentDetails';
import GradeForm from '../components/GradeForm';
import GradeDetails from '../components/GradeDetails';

interface AssignmentDetailPageProps {
  onLogout: () => void;
}

const AssignmentDetailPage: React.FC<AssignmentDetailPageProps> = ({ onLogout }) => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (e) {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch assignment data
  useEffect(() => {
    const fetchAssignment = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/api';
        const response = await fetch(`${apiUrl}/assignments/${id}`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Convert date strings to Date objects
        const processedData = {
          ...data,
          createdAt: new Date(data.createdAt),
          gradedAt: data.gradedAt ? new Date(data.gradedAt) : undefined
        };
        
        setAssignment(processedData);
        
        // Pre-populate feedback if assignment is already graded
        if (processedData.feedback) {
          // setFeedback(processedData.feedback); // Removed, handled in GradeDetails
        }
        
        // Pre-populate grade if assignment is already graded
        if (processedData.grade !== undefined) {
          // setGrade(processedData.grade.toString()); // Removed, handled in GradeDetails
        }
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch assignment:', err);
        setError('Could not load assignment. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !assignment) {
    return (
      <div className="min-h-screen bg-gray-100">
        <DashboardHeader 
          user={user as User}
          onLogout={onLogout}
          title="Assignment Details"
        />
        <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-red-500 text-center py-4">
              {error || 'Assignment not found.'}
            </div>
            <div className="mt-4">
              <button
                onClick={() => navigate('/assignments')}
                className="text-blue-500 hover:text-blue-700"
              >
                &larr; Back to Assignments
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader 
        user={user as User}
        onLogout={onLogout}
        title="Assignment Details"
      />
      
      <main className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Assignment details section */}
            <div className="flex-1">
              <AssignmentDetails assignment={assignment} />
            </div>
            
            {/* Grade section - show grade form for teachers with ungraded assignments */}
            {user?.role === 'teacher' && !assignment.grade && (
              <div className="lg:w-1/3">
                <GradeForm assignment={assignment} user={user} onAssignmentUpdated={(updatedAssignment) => setAssignment(updatedAssignment)} />
              </div>
            )}
            
            {/* Show grade details if assignment is graded */}
            {assignment.grade !== undefined && (
              <div className="lg:w-1/3">
                <GradeDetails assignment={assignment} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AssignmentDetailPage;