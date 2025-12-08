"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { io, Socket } from "socket.io-client";
import { ChatAPI } from "@/services/chat/chat.service";
import { getUserInfo } from "@/services/auth/getUserInfo";

interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
  senderName: string;
  senderAvatar?: string;
}

interface Participant {
  userId: string;
  name: string;
  avatar?: string;
}

interface Chat {
  id: string;
  participants: Participant[];
  lastMessage?: Message;
  unreadCount?: number;
}

export default function ChatApp() {
  const [chats, setChats] = useState<Chat[]>([]);
  console.log(chats)
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);


  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [typingUsers, setTypingUsers] = useState<Record<string, string>>({}); // chatId -> username
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);


  console.log(chats)

  // Fetch logged-in user info
  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserInfo();
      setUser(data);
    };
    fetchUser();
  }, []);

  const loggedInUserId = user?.id || "";
  const BACKEND_SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "https://travel-buddy-server-1.onrender.com";

  // Initialize socket
  useEffect(() => {
    if (!loggedInUserId) return;

    const socket: Socket = io(BACKEND_SOCKET_URL, { transports: ["websocket"], withCredentials: true });
    socketRef.current = socket;

    socket.on("connect", () => {
      // console.log("Connected to socket", socket.id);
      socket.emit("joinUser", loggedInUserId);
    });

    socket.on("newMessage", (msg: Message) => {
      if (selectedChat && msg.chatId === selectedChat.id) setMessages(prev => [...prev, msg]);
      setChats(prev =>
        prev.map(c =>
          c.id === msg.chatId
            ? { ...c, lastMessage: msg, unreadCount: c.id !== selectedChat?.id ? (c.unreadCount || 0) + 1 : 0 }
            : c
        )
      );
    });

    socket.on("typing", ({ chatId, userName }: { chatId: string; userName: string }) => {
      if (chatId === selectedChat?.id && userName !== user?.name) {
        setTypingUsers(prev => ({ ...prev, [chatId]: userName }));
        setTimeout(() => {
          setTypingUsers(prev => {
            const copy = { ...prev };
            delete copy[chatId];
            return copy;
          });
        }, 2000);
      }
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [loggedInUserId, selectedChat, user?.name]);

  // Fetch chats
  useEffect(() => {
    const fetchChats = async () => {
      if (!loggedInUserId) return;
      const data = await ChatAPI.getUserChats();
      console.log(data)
      setChats(data);
    };
    fetchChats();
  }, [loggedInUserId]);

  const selectChat = async (chat: Chat) => {
    setSelectedChat(chat);
    if (!chat) return;
    const msgs = await ChatAPI.getMessages(chat.id);
    setMessages(msgs);
    // Reset unread count
    setChats(prev => prev.map(c => (c.id === chat.id ? { ...c, unreadCount: 0 } : c)));
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;
    const message = await ChatAPI.sendMessage({ chatId: selectedChat.id, text: newMessage });
    setMessages(prev => [...prev, message]);
    setNewMessage("");
    socketRef.current?.emit("sendMessage", message);
  };

  const handleTyping = () => {
    if (selectedChat && newMessage.trim()) {
      socketRef.current?.emit("typing", { chatId: selectedChat.id, userName: user?.name || "Unknown" });
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-[80vh] border rounded-xl overflow-hidden shadow-lg bg-gray-50">
      {/* Chat List */}
      <div className="w-1/3 border-r bg-white flex flex-col">
        <h2 className="p-4 font-bold text-xl border-b text-gray-700">Chats</h2>
        <div className="flex-1 overflow-y-auto">
          {chats.map(chat => {
            const otherUser = chat.participants.find(p => p.userId !== loggedInUserId);
            return (
              <div
                key={chat.id}
                onClick={() => selectChat(chat)}
                className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 transition-colors border-b ${selectedChat?.id === chat.id ? "bg-gray-100" : ""}`}
              >
                <div className="w-10 h-10 relative mr-3">
                  <Image
                    src={otherUser?.avatar || "/default-avatar.png"}
                    alt={otherUser?.name || "Unknown User"}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 relative">
                  <p className="font-semibold text-gray-800">{otherUser?.name || "Unknown"}</p>
                  <p className="text-gray-500 text-sm truncate">{chat.lastMessage?.text || "No messages yet"}</p>
                  {chat.unreadCount && chat.unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="w-2/3 flex flex-col justify-between bg-gray-50">
        <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-2">
          {messages.map(msg => {
            const isSender = msg.senderId === loggedInUserId;
            return (
              <div key={msg.id} className={`flex gap-2 max-w-[70%] ${isSender ? "self-end flex-row-reverse" : "self-start"}`}>
                <div className="w-8 h-8 relative mt-1">
                  <Image
                    src={msg.senderAvatar || "/default-avatar.png"}
                    alt={msg.senderName || "Unknown User"}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className={`px-4 py-2 rounded-2xl break-words shadow-md ${isSender ? "bg-indigo-500 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"}`}>
                  {msg.text}
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {selectedChat && typingUsers[selectedChat.id] && (
            <div className="flex items-center gap-2 self-start mt-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
              <div className="px-4 py-2 bg-gray-200 rounded-2xl text-gray-700">
                {typingUsers[selectedChat.id]} is typing...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex p-4 border-t bg-white rounded-b-xl">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-l-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={newMessage}
            onChange={e => { setNewMessage(e.target.value); handleTyping(); }}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
          />
          <button
            className="bg-indigo-500 hover:bg-purple-500 text-white font-semibold px-6 rounded-r-2xl transition-colors"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
