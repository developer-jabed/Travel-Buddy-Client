"use server"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";
import { INotification } from "@/types/Notification.interface";
import { revalidateTag } from "next/cache";

// Fetch all notifications for the logged-in user
export async function getMyNotifications(): Promise<{
  success: boolean;
  data?: INotification[];
  message?: string;
}> {
  try {
    const response = await serverFetch.get("/notifications/me",{
      next: { tags: ["notifications-list"], revalidate: 180 },
    });

    if (!response.ok) {
      return { success: false, message: "Failed to fetch notifications" };
    }

    const resJson = await response.json();

    return {
      success: true,
      data: resJson?.data || [],
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch notifications",
    };
  }
}

// Mark notification as read
export async function markNotificationAsRead(
  id: string
): Promise<{ success: boolean; data?: INotification; message?: string }> {
  try {
    const response = await serverFetch.put(`/notifications/${id}/read`);

    if (!response.ok) {
      return { success: false, message: "Failed to mark notification as read" };
    }

    const resJson = await response.json();
    if (resJson?.success) {
      revalidateTag("notifications-list", { expire: 0 });
      
    }

    return {
      success: true,
      data: resJson?.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to mark notification as read",
    };
  }
}

// Delete a notification
export async function deleteNotification(
  id: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await serverFetch.delete(`/notifications/${id}`);

    if (!response.ok) {
      return { success: false, message: "Failed to delete notification" };
    }

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to delete notification",
    };
  }
}
