// Dashboard Page - Shows overview and statistics
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { issuesAPI } from '../api/api';

function Dashboard() {
  // State for issues data
  const [issues, setIssues] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
  });
  const [loading, setLoading] = useState(true);

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // Fetch issues when component mounts
  useEffect(() => {
    fetchIssues();
  }, []);

  // Fetch all issues and calculate statistics
  const fetchIssues = async () => {
    try {
      const data = await issuesAPI.getAll();
      setIssues(data);

      // Calculate statistics
      const total = data.length;
      const pending = data.filter(issue => issue.status === 'Pending').length;
      const inProgress = data.filter(issue => issue.status === 'In Progress').length;
      const resolved = data.filter(issue => issue.status === 'Resolved').length;

      setStats({ total, pending, inProgress, resolved });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching issues:', error);
      setLoading(false);
    }
  };

  // Get recent issues (last 5)
  const recentIssues = issues.slice(0, 5);

  // Get issues by the current user
  const myIssues = issues.filter(issue => issue.userId?._id === user?.id);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome, {user?.name || 'User'}!
        </h1>
        <p className="text-blue-100 text-lg">
          {user?.isAdmin
            ? 'Manage and track civic issues in your area'
            : 'Report and track civic issues in your area'}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      ) : (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Issues */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-500 text-sm">Total Issues</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                </div>
              </div>
            </div>

            {/* Pending Issues */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.707 2.707a1 1 0 001.414-1.414L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-500 text-sm">Pending</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.pending}</p>
                </div>
              </div>
            </div>

            {/* In Progress */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-500 text-sm">In Progress</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.inProgress}</p>
                </div>
              </div>
            </div>

            {/* Resolved */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-gray-500 text-sm">Resolved</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.resolved}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link
              to="/report"
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md p-6 transition flex items-center"
            >
              <div className="p-3 bg-green-500 rounded-full mr-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">Report New Issue</h3>
                <p className="text-green-100">Submit a civic complaint</p>
              </div>
            </Link>

            <Link
              to="/issues"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md p-6 transition flex items-center"
            >
              <div className="p-3 bg-blue-500 rounded-full mr-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">View All Issues</h3>
                <p className="text-blue-100">Browse and filter complaints</p>
              </div>
            </Link>
          </div>

          {/* Recent Issues Table */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Issues</h2>
              <Link to="/issues" className="text-blue-600 hover:underline">
                View All
              </Link>
            </div>

            {recentIssues.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No issues reported yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">Title</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">Category</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 text-gray-600 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentIssues.map(issue => (
                      <tr key={issue._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-800">{issue.title}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-700">
                            {issue.category}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-sm font-medium ${
                            issue.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            issue.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {issue.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">
                          {new Date(issue.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* My Issues (for non-admin users) */}
          {!user?.isAdmin && myIssues.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">My Reported Issues</h2>
              <p className="text-gray-600 mb-4">
                You have reported <span className="font-semibold">{myIssues.length}</span> issue(s)
              </p>
              <Link
                to="/issues"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                View My Issues
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
