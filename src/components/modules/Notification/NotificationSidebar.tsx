"use server"
import Link from "next/link";
import { getMyNotifications } from "@/services/Notification/Notification.service";
import { markNotificationAsReadAction } from "./actions";


export default async function NotificationSidebar() {
  const res = await getMyNotifications();

  const notifications = Array.isArray(res?.data) ? res.data : [];

  console.log("notification:", res.data)
  const unreadCount = notifications.filter(n => !n.isRead).length;

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
            <form
              key={n.id}
              action={markNotificationAsReadAction}
              method="post"
              className={`p-3 border-b flex justify-between items-center ${n.isRead ? "bg-gray-50" : "bg-white"
                }`}
            >

              <input type="hidden" name="id" value={n.id} />

              <div>
                <p className="text-sm">{n.message}</p>

                {n.link && (
                  <Link
                    href={n.link}
                    className="text-blue-600 text-xs mt-1 inline-block"
                  >
                    View
                  </Link>
                )}

                <p className="text-gray-400 text-xs mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>

              {!n.isRead && (
                <button
                  type="submit"
                  className="ml-2 text-xs text-blue-500 hover:underline"
                >
                  Mark read
                </button>
              )}
            </form>
          ))
        )}
      </div>
    </div>
  );
}
