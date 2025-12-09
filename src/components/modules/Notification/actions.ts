"use server";

import { markNotificationAsRead } from "@/services/Notification/Notification.service";
import { revalidatePath } from "next/cache";

export async function markNotificationAsReadAction(formData: FormData): Promise<void> {
  const id = formData.get("id") as string;
  if (!id) return;

  await markNotificationAsRead(id).catch(() => {});

  // Choose the correct path
  revalidatePath("/"); 
}
