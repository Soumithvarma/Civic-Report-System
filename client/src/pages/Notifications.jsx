import React, { useState, useEffect } from 'react';
// CORRECT
import { getNotifications, markAsRead, markAllAsRead, deleteNotification, clearAll } from "../utils/notifications";
function Notifications() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [notifications, setNotifications] = useState([]);

  const load = () => setNotifications(getNotifications(user?.id, user?.isAdmin));

  useEffect(() => {
    load();
    window.addEventListener('notificationsUpdated', load);
    return () => window.removeEventListener('notificationsUpdated', load);
  }, []);

  const handleRead = (id) => { markAsRead(id); load(); };
  const handleReadAll = () => { markAllAsRead(user?.id, user?.isAdmin); load(); };
  const handleDelete = (id) => { deleteNotification(id); load(); };
  const handleClearAll = () => { clearAll(user?.id, user?.isAdmin); load(); };

  const timeAgo = (dateString) => {
    const diff = Math.floor((new Date() - new Date(dateString)) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const iconData = (type) => ({
    success: { bg: 'bg-green-100', color: 'text-green-600', symbol: '✓' },
    warning: { bg: 'bg-yellow-100', color: 'text-yellow-600', symbol: '!' },
    error:   { bg: 'bg-red-100',   color: 'text-red-600',   symbol: '✕' },
    info:    { bg: 'bg-blue-100',  color: 'text-blue-600',  symbol: 'i' },
  }[type] || { bg: 'bg-blue-100', color: 'text-blue-600', symbol: 'i' });

  const unread = notifications.filter(n => !n.read).length;

  return (
    <div className="relative min-h-screen bg-[#0B0F4D] overflow-hidden">
      <div className="absolute top-[-120px] right-[-200px] w-96 h-96 rounded-full bg-[#CD9B3B]/10 blur-3xl" />
      <div className="absolute bottom-0 left-[-110px] w-72 h-72 rounded-full bg-[#CD9B3B]/10 blur-3xl" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute bottom-0 left-0 w-full opacity-20" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#CD9B3B" d="M0,192L80,186C160,180,320,160,480,144C640,128,800,120,960,140C1120,160,1280,210,1440,220V320H0Z" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-full opacity-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#F4D58D" d="M0,250L120,230C240,210,480,170,720,160C960,150,1200,190,1440,230V320H0Z" />
        </svg>
      </div>

      <div className="relative max-w-3xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#F0CD8B]/20 to-[#15184D] rounded-xl shadow-lg p-8 mb-6 text-white border border-[#CD9B3B]">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-[#CD9B3B] font-bold mb-1">Notifications</h1>
              <p className="text-gray-300">
                {unread > 0 ? `You have ${unread} unread notification${unread > 1 ? 's' : ''}` : 'All caught up!'}
              </p>
            </div>
            <div className="relative p-3 bg-[#CD9B3B]/20 rounded-full">
              <svg className="w-8 h-8 text-[#CD9B3B]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              {unread > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {unread > 9 ? '9+' : unread}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {notifications.length > 0 && (
          <div className="flex gap-3 mb-4 justify-end">
            {unread > 0 && (
              <button onClick={handleReadAll}
                className="px-4 py-2 text-sm text-[#CD9B3B] border border-[#CD9B3B] rounded-lg hover:bg-[#CD9B3B]/10 transition">
                Mark all as read
              </button>
            )}
            <button onClick={handleClearAll}
              className="px-4 py-2 text-sm text-red-400 border border-red-400 rounded-lg hover:bg-red-400/10 transition">
              Clear all
            </button>
          </div>
        )}

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="bg-gradient-to-r from-[#F0CD8B]/20 to-[#15184D] border border-[#CD9B3B] rounded-xl p-12 text-center">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p className="text-gray-300 text-lg">No notifications yet</p>
            <p className="text-gray-400 text-sm mt-1">Issue updates will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map(notif => {
              const icon = iconData(notif.type);
              return (
                <div key={notif.id}
                  onClick={() => !notif.read && handleRead(notif.id)}
                  className={`relative border rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                    notif.read
                      ? 'border-[#CD9B3B]/30 bg-[#15184D]/50 opacity-70'
                      : 'border-[#CD9B3B] bg-gradient-to-r from-[#F0CD8B]/15 to-[#15184D] hover:from-[#F0CD8B]/25'
                  }`}>
                  {!notif.read && (
                    <span className="absolute top-4 right-10 w-2 h-2 bg-[#CD9B3B] rounded-full" />
                  )}
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full flex-shrink-0 ${icon.bg}`}>
                      <span className={`text-sm font-bold ${icon.color}`}>{icon.symbol}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm leading-relaxed ${notif.read ? 'text-gray-400' : 'text-white font-medium'}`}>
                        {notif.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{timeAgo(notif.createdAt)}</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(notif.id); }}
                      className="text-gray-500 hover:text-red-400 transition p-1 rounded flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;