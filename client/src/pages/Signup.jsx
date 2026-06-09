// Signup Page - Create new user account
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/api';
import { FaPen } from "react-icons/fa";
import { VscErrorSmall } from "react-icons/vsc";


function Signup() {
  const navigate = useNavigate();

  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      // Call signup API
      const data = await authAPI.signup(name, email, password);

      if (data.message === 'User created successfully') {
        // Redirect to login page
        alert('Account created successfully! Please login.');
        navigate('/login');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Unable to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0E103D] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-120px] right-[-200px] w-96 h-96 rounded-full bg-[#CD9B3B]/10 blur-3xl"></div>

      <div className="absolute bottom-0 left-[-110px] w-72 h-72 rounded-full bg-[#CD9B3B]/10 blur-3xl"></div>

      {/* Wave 1 */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full opacity-20"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#CD9B3B"
          d="M0,192L80,186C160,180,320,160,480,144C640,128,800,120,960,140C1120,160,1280,210,1440,220V320H0Z"
        />
      </svg>

      {/* Wave 2 */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full opacity-10"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#F4D58D"
          d="M0,250L120,230C240,210,480,170,720,160C960,150,1200,190,1440,230V320H0Z"
        />
      </svg>

      {/* Wave 3 */}
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

      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#CD9B3B] rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#CD9B3B]">Create Account</h1>
          <p className="text-gray-400 mt-2">Join the civic reporting community</p>
        </div>

        {/* Signup Form Card */}
        <div className="bg-white/5 backdrop-blur-md border-2 border-[#CD9B3B] rounded-3xl shadow-2xl p-6">
          <div className="flex gap-5 mb-8">
           <h2 className="text-3xl font-bold text-[#CD9B3B]">Sign Up</h2>
          <FaPen className="text-[#CD9B3B] text-3xl" />
          </div>

          {/* Error Message */}
          {error && (
          <div className="bg-red-500/30 border border-red-500 text-white p-3 rounded-lg mb-2">
                        <VscErrorSmall className="inline mr-2 h-7 w-7" />
                        {error}
                      </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-[#CD9B3B] font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-[#15184D] text-white border-2 border-[#CD9B3B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD9B3B]"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-[#CD9B3B] font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#15184D] text-white border-2 border-[#CD9B3B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD9B3B]"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[#CD9B3B] font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#15184D] text-white border-2 border-[#CD9B3B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD9B3B]"
                placeholder="Create a password (min 6 characters)"
                required
                minLength="6"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-[#CD9B3B] font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#15184D] text-white border-2 border-[#CD9B3B] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD9B3B]"
                placeholder="Confirm your password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#CD9B3B] hover:bg-[#B8860B]'
              }`}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>``

          {/* Login Link */}
          <p className="mt-6 text-center text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="text-[#CD9B3B] hover:text-white font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
