// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/DashboardPage';
import { User } from './types';
import AssignmentCreatePage from './pages/AssignmentCreatePage';
import AssignmentDetailPage from './pages/AssignmentDetailPage';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  // Check for logged in user on page load
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      try {
        setLoggedInUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('loggedInUser');
      }
    }
  }, []);

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser');
  };

  const handleLogin = (user: User) => {
    setLoggedInUser(user);
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            loggedInUser ? 
              <Navigate to="/assignments" replace /> : 
              <LoginPage onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/assignments/create" 
          element={
            loggedInUser ? 
              <AssignmentCreatePage onLogout={handleLogout} /> : 
              <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/assignments/:id" 
          element={
            loggedInUser ? 
              <AssignmentDetailPage onLogout={handleLogout} /> : 
              <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/assignments" 
          element={
            loggedInUser ? 
              <Dashboard onLogout={handleLogout} /> : 
              <Navigate to="/login" replace />
          } 
        />
        <Route path="/" element={<Navigate to={loggedInUser ? "/assignments" : "/login"} replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;