import React, { createContext, useState, useCallback } from "react";

export const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((type, message) => {
    const newNotifications = { type, message };

    setNotifications((prev) => {
      const next = [newNotifications, ...prev].slice(0, 3);
      const notificationList = next.map((toast, index) => ({
        ...toast,
        id: index,
      }));

      const notification = notificationList.find(
        (t) => t.message === message && t.type === type
      );
      if (notification) {
        setTimeout(() => {
          dismiss(notification.id);
        }, 3000);
      }

      return notificationList;
    });
  }, []);

  const dismiss = (id) => {
    setNotifications((prev) =>
      prev.filter((toast) => toast.id !== id).map((t, i) => ({ ...t, id: i }))
    );
  };

  const notify = {
    success: (msg) => addNotification("success", msg),
    error: (msg) => addNotification("error", msg),
  };

  return (
    <NotificationContext.Provider value={notify}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`animate-slide-in relative flex items-start justify-between gap-3 px-4 py-3 rounded-lg shadow-md text-white transition-all duration-300 ${
              n.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            <span className="flex-1">{n.message}</span>
            <button
              onClick={() => dismiss(n.id)}
              className="text-white text-lg leading-none hover:opacity-70"
              aria-label="Close notification"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
