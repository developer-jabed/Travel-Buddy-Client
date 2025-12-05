"use client";

import { useState, useEffect } from "react";
import { INotification } from "@/types/Notification.interface";
import { getMyNotifications, markNotificationAsRead } from "@/services/Notification/Notification.service";
import { formatDistanceToNow } from "date-fns";

export default function NotificationSidebar() {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch notifications on mount
  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await getMyNotifications();
      if (res.success) {
        const data: INotification[] = Array.isArray(res.data) ? res.data : [];
        setNotifications(data);
        setUnreadCount(data.filter(n => !n.isRead).length);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    const res = await markNotificationAsRead(id);
    if (res.success) {
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount(prev => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="fixed left-0 top-16 w-80 h-[calc(100vh-64px)] bg-white shadow-lg overflow-y-auto z-50">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Notifications</h2>
        {unreadCount > 0 && (
          <span className="bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
            {unreadCount}
          </span>
        )}
      </div>
      <div className="p-2">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-sm p-2">No notifications</p>
        ) : (
          notifications.map(n => (
            <div
              key={n.id}
              className={`p-3 border-b cursor-pointer hover:bg-gray-100 flex justify-between items-center ${
                n.isRead ? "bg-gray-50" : "bg-white"
              }`}
            >
              <div>
                <p className="text-sm">{n.message}</p>
                {n.link && (
                  <a href={n.link} className="text-blue-600 text-xs mt-1 inline-block">
                    View
                  </a>
                )}
                <p className="text-gray-400 text-xs mt-1">
                  {formatDistanceToNow(new Date(n.createdAt))} ago
                </p>
              </div>
              {!n.isRead && (
                <button
                  onClick={() => handleMarkAsRead(n.id)}
                  className="ml-2 text-xs text-blue-500 hover:underline"
                >
                  Mark read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
