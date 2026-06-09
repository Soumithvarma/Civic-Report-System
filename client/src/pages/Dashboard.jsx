
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { issuesAPI } from '../api/api';
import { toast } from 'react-toastify';

function Dashboard() {
 
  const [issues, setIssues] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
  });
  const [loading, setLoading] = useState(true);


  const user = JSON.parse(localStorage.getItem('user') || 'null');

  
  useEffect(() => {
    fetchIssues();
  }, []);


  const fetchIssues = async () => {
    try {
      const data = await issuesAPI.getAll();
      setIssues(data);

      //statistics
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


  const recentIssues = issues.slice(0, 5);

  
  const myIssues = issues.filter(issue => issue.userId?._id === user?.id);

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
    <div className="relative min-h-screen max-w-7xl mx-auto mb-0 ">
         
      
  
      <div className="bg-gradient-to-r from-[#F0CD8B]/20 to-[#15184D] rounded-xl shadow-lg p-8 mb-8 mt-3 text-white border border-[#CD9B3B]">
        <h1 className="text-3xl text-[#CD9B3B] font-bold mb-2">
          Welcome, {user?.name || 'User'}!
        </h1>
        <p className="text-gray-200 text-lg">
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
        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        
           
            <div className="group bg-gradient-to-r from-[#F0CD8B]/30 to-[#15184D] rounded-xl shadow-md p-6 border border-[#CD9B3B] hover:bg-blue-700 hover:border-blue-700 transition-all duration-500 hover:shadow-xl">
  <div className="flex items-center">
    <div className="p-3 bg-blue-100 rounded-full transition-all duration-500 group-hover:scale-110">
      <svg
        className="w-6 h-6 text-blue-600 transition-transform duration-700 group-hover:rotate-[360deg] group-hover:scale-125"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
       
        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    </div>

    <div className="ml-4">
      <p className="text-white text-sm">Total Issues</p>
      <p className="text-2xl font-bold text-white">{stats.total}</p>
    </div>
  </div>
</div>

            {/* Pending Issues */}
        
            <div className="group bg-gradient-to-r from-[#F0CD8B]/30 to-[#15184D] rounded-xl shadow-md p-6 border border-[#CD9B3B] hover:bg-red-700 hover:border-red-700 transition-all duration-500  hover:shadow-xl">
  <div className="flex items-center">
    <div className="p-3 bg-red-100 rounded-full transition-all duration-500 group-hover:scale-110">
      <svg
        className="w-6 h-6 text-red-500 transition-transform duration-700 group-hover:rotate-[360deg] group-hover:scale-125"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
      
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.707 2.707a1 1 0 001.414-1.414L11 9.586V6z" clipRule="evenodd" />
      </svg>
    </div>

    <div className="ml-4">
      <p className="text-white text-sm">Pending</p>
      <p className="text-2xl font-bold text-white">{stats.pending}</p>
    </div>
  </div>
</div>

            {/* In Progress */}
            <div className="group bg-gradient-to-r from-[#F0CD8B]/30 to-[#15184D] rounded-xl shadow-md p-6 border border-[#CD9B3B] hover:bg-amber-700 hover:border-amber-700 transition-all duration-500 hover:shadow-xl">
  <div className="flex items-center">
    <div className="p-3 bg-amber-100 rounded-full transition-all duration-500 group-hover:scale-110">
      <svg
        className="w-6 h-6 text-amber-600 transition-transform duration-700 group-hover:rotate-[360deg] group-hover:scale-125"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
     
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
      </svg>
    </div>

    <div className="ml-4">
      <p className="text-white text-sm">In Progress</p>
      <p className="text-2xl font-bold text-white">{stats.inProgress}</p>
    </div>
  </div>
</div>

            {/* Resolved */}
         <div className="group bg-gradient-to-r from-[#F0CD8B]/30 to-[#15184D] rounded-xl shadow-md p-6 border border-[#CD9B3B] hover:bg-green-700 hover:border-green-700 transition-all duration-300 hover:shadow-xl">
  <div className="flex items-center">
    
    <div className="p-3 bg-green-100 rounded-full transition-all duration-300 group-hover:scale-110">
      <svg
        className="w-6 h-6 text-green-600 transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-125"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    </div>

    <div className="ml-4">
      <p className="text-white text-sm">Resolved</p>
      <p className="text-2xl font-bold text-white">
        {stats.resolved}
      </p>
    </div>

  </div>
</div>
          </div>

       
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link
              to="/report"
              className="bg-gradient-to-r from-[#F0CD8B]/30 to-[#15184D] border border-[#CD9B3B] hover:bg-green-700 hover:border-green-700 text-white rounded-xl shadow-md p-6 transition transition-transform duration-300 hover:scale-95 flex items-center"
            >
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">Report New Issue</h3>
                <p className="text-gray-200">Submit a civic complaint</p>
              </div>
            </Link>

            <Link
              to="/issues"
              className="bg-gradient-to-r from-[#F0CD8B]/30 to-[#15184D] border border-[#CD9B3B] hover:bg-blue-700 hover:border-blue-700 text-white rounded-xl shadow-md p-6 transition-transform duration-300 hover:scale-95 flex items-center"
            >
              <div className="p-3 bg-blue-200 rounded-full mr-4">
                <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">View All Issues</h3>
                <p className="text-gray-200">Browse and filter complaints</p>
              </div>
            </Link>
          </div>

          {/* Recent Issues Table */}
          <div className="bg-[#15184D]/ backdrop-blur-sm border border-[#CD9B3B] rounded-xl shadow-md p-6 mb-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#CD9B3B]">Recent Issues</h2>
              <Link to="/issues" className="text-gray-300 hover:text-[#CD9B3B] hover:underline transition">
                View All
              </Link>
            </div>

            {recentIssues.length === 0 ? (
              <p className="text-center text-gray-300 py-8">No issues reported yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#CD9B3B]/60">
                      <th className="text-left py-3 px-4 text-[#CD9B3B]/90 font-semibold">Title</th>
                      <th className="text-left py-3 px-4 text-[#CD9B3B]/90 font-semibold">Category</th>
                      <th className="text-left py-3 px-4 text-[#CD9B3B]/90 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 text-[#CD9B3B]/90 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentIssues.map(issue => (
                      <tr key={issue._id} className="border-b border-[#CD9B3B]/60 ">
                        <td className="py-3 px-4 text-gray-300">{issue.title}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-gray-300 rounded text-sm text-gray-700">
                            {issue.category}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-sm font-medium ${
                            issue.status === 'Pending' ? 'bg-red-300 text-red-800' :
                            issue.status === 'In Progress' ? 'bg-yellow-300 text-yellow-800' :
                            'bg-green-300 text-green-800'
                          }`}>
                            {issue.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-300 text-sm">
                          {new Date(issue.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

         
        
        </>
      )}
    </div>
    </div>
  );
}

export default Dashboard;
