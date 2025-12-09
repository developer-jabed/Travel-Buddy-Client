"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function getUserChats() {
  const res = await serverFetch.get("/chat/user");
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
  if (!res.ok) throw new Error(data.message || "Failed to create/get chat");
  return data.data;
}

export async function getMessages(chatId: string) {
  const res = await serverFetch.get(`/chat/${chatId}`);
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
  if (!res.ok) throw new Error(data.message || "Failed to send message");

  return data.data;
}
