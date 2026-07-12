import { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const openDropdown = useCallback(() => setDropdownOpen(true), []);
  const closeDropdown = useCallback(() => setDropdownOpen(false), []);
  const toggleDropdown = useCallback(() => setDropdownOpen((v) => !v), []);

  return (
    <NotificationContext.Provider
      value={{ isDropdownOpen, openDropdown, closeDropdown, toggleDropdown, unreadCount, setUnreadCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationUI() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotificationUI must be used within NotificationProvider');
  return ctx;
}
