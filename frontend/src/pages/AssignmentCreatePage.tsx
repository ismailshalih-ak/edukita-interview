// src/pages/AssignmentCreatePage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Subject } from '../types';
import DashboardHeader from '../components/DashboardHeader';
import AssignmentForm from '../components/AssignmentForm';

interface AssignmentCreatePageProps {
  onLogout: () => void;
}

const AssignmentCreatePage: React.FC<AssignmentCreatePageProps> = ({ onLogout }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (title: string, content: string, subject: Subject) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const apiUrl = import.meta.env.VITE_BACKEND_URL;
      
      const response = await fetch(`${apiUrl}/assignments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          subject,
          studentId: user?.id, // Include the student's ID
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `Error: ${response.status}`);
      }
      
      // Navigate back to dashboard on success
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to create assignment:', err);
      setError(err instanceof Error ? err.message : 'Failed to create assignment');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Students can create assignments, but teachers should not be here
  if (user.role !== 'student') {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader 
        user={user}
        onLogout={onLogout}
        title="Create Assignment"
      />
      
      <main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Create New Assignment</h1>
            <p className="mt-1 text-sm text-gray-500">
              Fill out the form below to submit a new assignment.
            </p>
          </div>
          
          <AssignmentForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            error={error}
          />
          
          <div className="mt-4 flex">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-600 hover:text-gray-900"
            >
              &larr; Back to Dashboard
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AssignmentCreatePage;