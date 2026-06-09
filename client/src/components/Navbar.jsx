import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate,useLocation } from 'react-router-dom';
import { getUnreadCount } from '../utils/notifications';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const refresh = () => {
      const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
      if (currentUser) {
        const count = getUnreadCount(currentUser.id, currentUser.isAdmin);
        setUnreadCount(count);
      } else {
        setUnreadCount(0);
      }
    };
    refresh();
    window.addEventListener('notificationsUpdated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('notificationsUpdated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setMobileMenuOpen(false);
    setUnreadCount(0);
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const navLinkClass = ({ isActive }) =>
    `relative transition-colors font-medium pl-8 ${
      isActive ? 'text-[#0E103D] text-xl' : 'text-white hover:text-gray-400'
    }`;

  return (
    <nav className="bg-[#CD9B3B] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

       
          <NavLink to="/dashboard" className="flex items-center space-x-2">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-bold text-xl">Civic Report</span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">

            <NavLink to="/dashboard" className={navLinkClass}>
              {({ isActive }) => (
                <div className="relative">
                  {isActive && (
                    <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-[4px] h-6 bg-[#0E103D] rounded-full" />
                  )}
                  Dashboard
                </div>
              )}
            </NavLink>

            <NavLink to="/issues" className={navLinkClass}>
              {({ isActive }) => (
                <div className="relative">
                  {isActive && (
                    <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-[4px] h-6 bg-[#0E103D] rounded-full" />
                  )}
                  View Issues
                </div>
              )}
            </NavLink>

            <NavLink to="/report" className={navLinkClass}>
              {({ isActive }) => (
                <div className="relative">
                  {isActive && (
                    <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-[4px] h-6 bg-[#0E103D] rounded-full" />
                  )}
                  Report Issue
                </div>
              )}
            </NavLink>

            {/* Bell Icon*/}
            {user && (
              <div className="relative">
                <NavLink to="/notifications" className="block p-1">
                  <svg
                    className="w-6 h-6 text-white hover:text-[#0E103D] transition-colors"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </NavLink>
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold px-1 pointer-events-none z-10">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
            )}

          </div>

         
          <div className="hidden md:flex items-center">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-2xl transition-colors duration-200 font-medium"
            >
              Logout
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-all duration-200 active:scale-95 active:rotate-90"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>

        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed top-16 left-0 w-full bg-[#CD9B3B] z-40 border-t border-white/20 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex flex-col space-y-3 p-4">

              {[
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/issues',    label: 'View Issues' },
                { to: '/report',    label: 'Report Issue' },
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                      isActive ? 'bg-[#0E103D] text-white' : 'hover:bg-white/10 text-white'
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </NavLink>
              ))}

        
              {user && (
                <NavLink
                  to="/notifications"
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                      isActive ? 'bg-[#0E103D] text-white' : 'hover:bg-white/10 text-white'
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <span className="bg-red-600 text-white text-xs rounded-full min-w-[20px] h-[20px] flex items-center justify-center font-bold px-1">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </NavLink>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-3 rounded-xl transition-colors duration-200 font-medium text-left"
              >
                Logout
              </button>

            </div>
          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;