// Navbar Component - Navigation bar for the application
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // Handle logout - Clear localStorage and redirect to login
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="font-bold text-xl">Civic Report</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/dashboard"
              className="hover:text-blue-200 transition-colors font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/issues"
              className="hover:text-blue-200 transition-colors font-medium"
            >
              View Issues
            </Link>
            <Link
              to="/report"
              className="hover:text-blue-200 transition-colors font-medium"
            >
              Report Issue
            </Link>
          </div>

          {/* User Info & Logout */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <div className="text-sm">
                <span className="text-blue-200">Welcome,</span>{' '}
                <span className="font-semibold">{user.name}</span>
                {user.isAdmin && (
                  <span className="ml-2 bg-yellow-500 text-yellow-900 px-2 py-0.5 rounded text-xs font-bold">
                    ADMIN
                  </span>
                )}
              </div>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors font-medium"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/dashboard"
              className="block py-2 hover:text-blue-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/issues"
              className="block py-2 hover:text-blue-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              View Issues
            </Link>
            <Link
              to="/report"
              className="block py-2 hover:text-blue-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Report Issue
            </Link>
            {user && (
              <div className="py-2 text-sm">
                <span className="text-blue-200">Welcome,</span>{' '}
                <span className="font-semibold">{user.name}</span>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="w-full text-left py-2 text-red-200 hover:text-red-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
