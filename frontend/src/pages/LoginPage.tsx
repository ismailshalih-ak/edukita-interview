// pages/login.tsx
import { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import { User } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch users for login dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/api';
        const response = await fetch(`${apiUrl}/users`);
        
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserLogin = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (user) onLogin(user);
  };

  const handleSignup = async (name: string, email: string, role: string) => {
    try {
      const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/api';
      const response = await fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name, email, role }),
      });
      
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
      const newUser = await response.json();
      onLogin(newUser);
      return true;
    } catch (err) {
      console.error('Error creating user:', err);
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="flex flex-col gap-8 w-full max-w-md">
        <LoginForm 
          users={users} 
          loading={loading} 
          error={error} 
          onLogin={handleUserLogin} 
        />
        <SignUpForm onSignup={handleSignup} />
      </div>
    </div>
  );
};

export default LoginPage;