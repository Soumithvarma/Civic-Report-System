// Main App Component
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ReportIssue from './pages/ReportIssue';
import ViewIssues from './pages/ViewIssues';
import Notifications from './pages/Notifications';

import Navbar from './components/Navbar';

// Protected Route Component
function ProtectedRoute({ children }) {
  const storedUser = localStorage.getItem('user');

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  return user
    ? children
    : <Navigate to="/login" replace />;
}

function App() {
  const storedUser = localStorage.getItem('user');

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  return (
    <div className="min-h-screen w-full">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="mx-auto">
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
  path="/notifications"
  element={
    <ProtectedRoute>
      <Notifications />
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

          {/* Root Route */}
          <Route
            path="/"
            element={
              <Navigate
                to={user ? '/dashboard' : '/login'}
                replace
              />
            }
          />

          {/* Invalid Routes */}
          <Route
            path="*"
            element={
              <Navigate
                to={user ? '/dashboard' : '/login'}
                replace
              />
            }
          />

        </Routes>
      </main>
    </div>
  );
}

export default App;