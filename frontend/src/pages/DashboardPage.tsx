// src/pages/assignments.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Assignment, User } from "../types";
import DashboardHeader from "../components/DashboardHeader";
import AssignmentList from "../components/AssignmentList";

interface DashboardPageProps {
  onLogout: () => void;
}

const subjects = ['math', 'english']

const Dashboard = ({ onLogout }: DashboardPageProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

  useEffect(() => {
    // Get logged in user from localStorage
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (e) {
        // If there's an error parsing the user data, redirect to login
        navigate('/login');
      }
    } else {
      // If no user is logged in, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  // Fetch assignments data
  useEffect(() => {
    // Don't fetch assignments until we have user data
    if (!user) return;

    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/api';
        
        // Build URL based on user role
        let url = `${apiUrl}/assignments`;
        const params = new URLSearchParams();
        
        if (user.role === 'student') {
          // If student, only get their assignments
          params.append('studentId', user.id.toString());
        }
        
        if (selectedSubject) {
          params.append('subject', selectedSubject);
        }

        // Add params to URL if any exist
        if (params.toString()) {
            url += `?${params.toString()}`;
          }
        
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Convert date strings to Date objects
        const processedData = data.map((assignment: any) => ({
          ...assignment,
          createdAt: new Date(assignment.createdAt)
        }));
        
        setAssignments(processedData);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch assignments:', err);
        setError('Could not load assignments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [user, selectedSubject]);

  const handleLogout = () => {
    onLogout();
  };

  const handleViewDetails = (assignmentId: number) => {
    navigate(`/assignments/${assignmentId}`);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(e.target.value);
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Set the header title based on user role
  const headerTitle = user.role === "teacher" ? "Teacher Portal" : "Student Portal";

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader 
        user={user}
        onLogout={handleLogout}
        title={headerTitle}
      />

      {/* Assignments section */}
      <div className="m-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            {user.role === 'teacher' ? 'All Assignments' : 'Your Assignments'}
          </h2>
          
          <div className="flex items-center gap-4">
            {/* Subject filter for teachers */}
            {user.role === 'teacher' && (
              <div className="flex items-center space-x-2">
                <label htmlFor="subject-filter" className="text-sm text-gray-700">
                  Filter by subject:
                </label>
                <select
                  id="subject-filter"
                  value={selectedSubject}
                  onChange={handleSubjectChange}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value="">All Subjects</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject.charAt(0).toUpperCase() + subject.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            {user.role === 'student' && (
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                onClick={() => navigate('/assignments/create')}
              >
                Create New Assignment
              </button>
            )}
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-8 bg-white shadow rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-white shadow rounded-lg p-6 text-red-500 text-center">
            {error}
          </div>
        ) : (
          <AssignmentList 
            assignments={assignments}
            onViewDetails={handleViewDetails}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;