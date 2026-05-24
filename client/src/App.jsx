// Main App Component
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ReportIssue from './pages/ReportIssue';
import ViewIssues from './pages/ViewIssues';
import Navbar from './components/Navbar';

// App Component - Routes and Layout
function App() {
  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // Protected Route - Only accessible after login
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Show navbar only when user is logged in */}
      {user && <Navbar />}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <ReportIssue />
              </ProtectedRoute>
            }
          />
          <Route
            path="/issues"
            element={
              <ProtectedRoute>
                <ViewIssues />
              </ProtectedRoute>
            }
          />

          {/* Default Route */}
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
