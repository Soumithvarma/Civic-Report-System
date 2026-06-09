import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/api';
import { FaLocationDot } from "react-icons/fa6";
import { IoMdLogIn } from "react-icons/io";
import { VscErrorSmall } from "react-icons/vsc";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authAPI.login(email, password);

      if (data.message === 'Login successful') {
        localStorage.setItem('user', JSON.stringify(data.user));
          window.dispatchEvent(new Event('notificationsUpdated'));
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Unable to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0E103D] overflow-hidden">

      
      <div className="absolute top-[-120px] right-[-200px] w-96 h-96 rounded-full bg-[#CD9B3B]/10 blur-3xl"></div>

      <div className="absolute bottom-0 left-[-110px] w-72 h-72 rounded-full bg-[#CD9B3B]/10 blur-3xl"></div>

    
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

     
      <div className="relative z-10 max-w-md w-full px-4">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#CD9B3B] rounded-full mb-4 shadow-lg">
            <FaLocationDot className="text-white text-2xl" />
          </div>

          <h1 className="text-4xl font-bold text-[#CD9B3B]">
            Civic Report
          </h1>

          <p className="text-gray-300 mt-2">
            Smart Issue Reporting System
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/5 backdrop-blur-md border-2 border-[#CD9B3B] rounded-3xl shadow-2xl p-6">

          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-3xl font-bold text-[#CD9B3B]">
              Login
            </h2>

            <IoMdLogIn className="text-[#CD9B3B] text-4xl" />
          </div>

          {error && (
            <div className="bg-red-500/30 border border-red-500 text-white p-3 rounded-lg mb-5">
              <VscErrorSmall className="inline mr-2 h-7 w-7" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-[#CD9B3B] font-medium mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 bg-[#15184D] text-white border-2 border-[#CD9B3B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD9B3B]"
              />
            </div>

            <div>
              <label className="block text-[#CD9B3B] font-medium mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 bg-[#15184D] text-white border-2 border-[#CD9B3B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD9B3B]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
                loading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-[#AB7A27] hover:bg-[#CD9B3B] hover:shadow-lg'
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="mt-9 text-center text-gray-300">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-white font-semibold hover:text-[#CD9B3B]"
            >
              Sign up
            </Link>
          </p>

          

        </div>
      </div>
    </div>
  );
}

export default Login;