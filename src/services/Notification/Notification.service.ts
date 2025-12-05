/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";
import { INotification } from "@/types/Notification.interface";

// Fetch all notifications for the logged-in user
export async function getMyNotifications(): Promise<{ success: boolean; data?: INotification[]; message?: string }> {
  try {
    const response = await serverFetch.get(`/notifications/me`);
    const data: INotification[] = await response.json();
    return { success: true, data };
  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch notifications",
    };
  }
}


export async function markNotificationAsRead(id: string): Promise<{ success: boolean; data?: INotification; message?: string }> {
  try {
    const response = await serverFetch.put(`/notifications/${id}/read`);
    const data: INotification = await response.json();
    return { success: true, data };
  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to mark notification as read",
    };
  }
}

// Delete a notification
export async function deleteNotification(id: string): Promise<{ success: boolean; message?: string }> {
  try {
    await serverFetch.delete(`/notifications/${id}`);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to delete notification",
    };
  }
}
