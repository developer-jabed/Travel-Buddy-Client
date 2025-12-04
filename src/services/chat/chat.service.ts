import { serverFetch } from "@/lib/server-fetch";

interface MessagePayload {
  chatId: string;
  text: string;
}

export const ChatAPI = {
  // Get all chats of logged-in user
  getUserChats: async () => {
    const res = await serverFetch.get("/chat/user");
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch chats");
    return data.data;
  },

  // Create or get chat with a user
  createOrGetChat: async (userB: string) => {
    const res = await serverFetch.post("/chat", {
      body: JSON.stringify({ userB }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create/get chat");
    return data.data;
  },

  // Get messages of a chat
  getMessages: async (chatId: string) => {
    const res = await serverFetch.get(`/chat/${chatId}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to get messages");
    return data.data;
  },

  // Send a message
  sendMessage: async (payload: MessagePayload) => {
    const res = await serverFetch.post("/chat/message", {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to send message");
    return data.data;
  },
};
