"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

export async function getUserChats() {
  const res = await serverFetch.get("/chat/user", {
    next: { tags: ["user-chats"], revalidate: 30 }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch chats");
  return data.data;
}

export async function createOrGetChat(userB: string) {
  const res = await serverFetch.post("/chat", {
    body: JSON.stringify({ userB }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if (data.success) {
    revalidateTag(`chat-messages-${data.data.chatId}`, { expire: 0 });
    revalidateTag("user-chats", { expire: 0 });

  }
  if (!res.ok) throw new Error(data.message || "Failed to create/get chat");
  return data.data;
}

export async function getMessages(chatId: string) {
  const res = await serverFetch.get(`/chat/${chatId}`, {
    next: { tags: [`chat-messages-${chatId}`], revalidate: 15 }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to get messages");
  return data.data;
}

interface MessagePayload {
  chatId: string;
  text: string;
}

export async function sendMessage(payload: MessagePayload) {
  const res = await serverFetch.post("/chat/message", {
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if (data.success) {
    revalidateTag(`chat-messages-${payload.chatId}`, { expire: 0 });
    revalidateTag("user-chats", { expire: 0 });

  }
  if (!res.ok) throw new Error(data.message || "Failed to send message");

  return data.data;
}
