"use server";

import { markNotificationAsRead } from "@/services/Notification/Notification.service";
import { revalidatePath } from "next/cache";

export async function markNotificationAsReadAction(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;

  if (!id) return;

  await markNotificationAsRead(id);

  // Refresh notification sidebar page
  revalidatePath("/"); // <-- set correct path where sidebar is used
}
