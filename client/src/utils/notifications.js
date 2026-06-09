const STORAGE_KEY = 'civic_notifications';


const dispatchUpdate = () => {
  window.dispatchEvent(new Event('notificationsUpdated'));
};

export const addNotification = ({ message, type = 'info', userId = null, forAdmin = false }) => {
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  all.unshift({
    id: Date.now() + Math.random(),
    message, type, userId, forAdmin,
    read: false,
    createdAt: new Date().toISOString()
  });
  if (all.length > 100) all.splice(100);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  dispatchUpdate();
};

export const getNotifications = (userId, isAdmin) => {
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  if (isAdmin) return all.filter(n => n.forAdmin);
  return all.filter(n => n.userId === userId && !n.forAdmin);
};

export const getUnreadCount = (userId, isAdmin) =>
  getNotifications(userId, isAdmin).filter(n => !n.read).length;

export const markAsRead = (notifId) => {
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all.map(n => n.id === notifId ? { ...n, read: true } : n)));
  dispatchUpdate();
};

export const markAllAsRead = (userId, isAdmin) => {
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all.map(n => {
    if (isAdmin && n.forAdmin) return { ...n, read: true };
    if (!isAdmin && n.userId === userId && !n.forAdmin) return { ...n, read: true };
    return n;
  })));
  dispatchUpdate();
};

export const deleteNotification = (notifId) => {
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all.filter(n => n.id !== notifId)));
  dispatchUpdate();
};

export const clearAll = (userId, isAdmin) => {
  const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all.filter(n => {
    if (isAdmin && n.forAdmin) return false;
    if (!isAdmin && n.userId === userId && !n.forAdmin) return false;
    return true;
  })));
  dispatchUpdate();
};