
import React, { useState, useEffect } from 'react';
import { issuesAPI } from '../api/api';
import { toast } from 'react-toastify';                      
import { addNotification } from '../utils/notifications';

function ViewIssues() {
 
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    status: ''
  });


  const user = JSON.parse(localStorage.getItem('user') || 'null');

  
  useEffect(() => {
    fetchIssues();
  }, [filters]);

  
  const fetchIssues = async () => {
    setLoading(true);
    try {
      const data = await issuesAPI.getAll(filters);
      setIssues(data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      setLoading(false);
    }
  };

 
 const handleStatusChange = async (issueId, newStatus) => {
  try {
    const data = await issuesAPI.updateStatus(issueId, newStatus);

    
    if (data.message === 'Issue status updated') {
  const updatedIssue = issues.find(issue => issue._id === issueId);

  setIssues(issues.map(issue =>
    issue._id === issueId ? { ...issue, status: newStatus } : issue
  ));

  
  addNotification({
    message: `Your issue "${updatedIssue.title}" is now ${newStatus}`,
    type: newStatus === 'Resolved' ? 'success' : 'warning',
    userId: updatedIssue.userId?._id,
    forAdmin: false
  });

  toast.success(`"${updatedIssue.title}" is now ${newStatus}`);
}

  } catch (error) {
    console.error('Error updating status:', error);

    toast.error('Failed to update issue status');
  }
};

  const handleDelete = async (issueId) => {
    if (window.confirm('Are you sure you want to delete this issue?')) {
      try {
        const data = await issuesAPI.delete(issueId);
        if (data.message === 'Issue deleted successfully') {
          
          setIssues(issues.filter(issue => issue._id !== issueId));
        }
      } catch (error) {
        console.error('Error deleting issue:', error);
      }
    }
  };

  
  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };


  const clearFilters = () => {
    setFilters({ category: '', status: '' });
  };


  const categories = ['Road Damage', 'Garbage', 'Water Leakage', 'Street Light', 'Drainage', 'Other'];
  const statuses = ['Pending', 'In Progress', 'Resolved'];

  return (
 <div className="relative min-h-screen bg-[#0B0F4D] overflow-x-hidden">

    
  
      <div className="absolute top-[-120px] right-[-200px] w-96 h-96 rounded-full bg-[#CD9B3B]/10 blur-3xl"></div>

      <div className="absolute bottom-0 left-[-110px] w-72 h-72 rounded-full bg-[#CD9B3B]/10 blur-3xl"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
    
      <svg
        className="absolute bottom-0 left-0 w-full opacity-20"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#CD9B3B"
          d="M0,192L80,186C160,180,320,160,480,144C640,128,800,120,960,140C1120,160,1280,210,1440,220V320H0Z"
        />
      </svg>

      
      <svg
        className="absolute bottom-0 left-0 w-full opacity-10"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#F4D58D"
          d="M0,250L120,230C240,210,480,170,720,160C960,150,1200,190,1440,230V320H0Z"
        />
      </svg>

     
      <svg
        className="absolute bottom-0 left-0 w-full opacity-5"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#FFFFFF"
          d="M0,280L100,260C200,240,400,220,600,210C800,200,1000,220,1200,240C1300,250,1380,260,1440,270V320H0Z"
        />
      </svg>
</div>
    <div className="relative min-h-screen max-w-7xl mx-auto mb-0">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#F0CD8B]/20 to-[#15184D] rounded-xl shadow-lg p-8 mb-8 mt-3 text-white border border-[#CD9B3B]">
        <h1 className="text-3xl text-[#CD9B3B] font-bold mb-2">All Civic Issues</h1>
        <p className="text-gray-300">
        Browse, filter, and track reported issues in your community
        </p>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-r from-[#F0CD8B]/20 to-[#15184D] rounded-xl shadow-lg p-8 mb-8 mt-3 text-white border border-[#CD9B3B]">
        <div className="flex flex-wrap items-center gap-5">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="text-gray-300 font-medium">Filters:</span>
          </div>

          {/* Category Filter */}
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="filter-select"
          >
            <option value="">All Statuses</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          {/* Clear Filters Button */}
          {(filters.category || filters.status) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-red-600 hover:text-red-700 font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Issues Display */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-300">Loading issues...</p>
        </div>
      ) : issues.length === 0 ? (
        <div className="bg-gradient-to-r from-[#F0CD8B]/20 to-[#15184D] rounded-xl shadow-md p-12 text-center border border-[#CD9B3B]">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="mt-4 text-gray-300 text-lg">No issues found</p>
          <p className="text-gray-300">Try adjusting your filters or report a new issue</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map(issue => (
            <div key={issue._id} className=" border border-[#CD9B3B] bg-gradient-to-r from-[#F0CD8B]/20 to-[#15184D] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              {/* Issue Image */}
              {issue.image ? (
                <img
                  src={`https://civic-report-system-2.onrender.com${issue.image}`}
                  alt={issue.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-600 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}

              {/* Issue Details */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-[#CD9B3B] mb-2">{issue.title}</h3>

                {/* Category & Status Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 bg-gray-300 rounded text-sm text-gray-800">
                    {issue.category}
                  </span>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    issue.status === 'Pending' ? 'bg-red-300 text-red-800' :
                    issue.status === 'In Progress' ? 'bg-yellow-300 text-yellow-800' :
                    'bg-green-300 text-green-800'
                  }`}>
                    {issue.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-4 line-clamp-3">{issue.description}</p>

                {/* Location */}
                <div className="flex items-start mb-3">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-sm">{issue.location}</span>
                </div>

                {/* Reporter & Date */}
                <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
                  <span>Reported by: {issue.userId?.name || 'Unknown'}</span>
                  <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Admin Controls */}
                {user?.isAdmin && (
                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    {/* Status Change */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Update Status:</span>
                      <select
                        value={issue.status}
                        onChange={(e) => handleStatusChange(issue._id, e.target.value)}
                        className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        {statuses.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(issue._id)}
                      className="w-full py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition font-medium"
                    >
                      Delete Issue
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

export default ViewIssues;
