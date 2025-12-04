"use client";

import Image from "next/image";
import { ChatAPI } from "@/services/chat/chat.service";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface Message {
    id: string;
    chatId: string;
    senderId: string;
    text: string;
    createdAt: string;
    senderName: string; // use "name" from backend
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
}

export default function ChatApp() {
    const [chats, setChats] = useState<Chat[]>([]);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [typingUser, setTypingUser] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const socketRef = useRef<Socket | null>(null);

    const loggedInUserId = "ME"; // replace with actual logged-in user id
    const BACKEND_SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";

    // Initialize socket
    useEffect(() => {
        socketRef.current = io(BACKEND_SOCKET_URL, {
            transports: ["websocket"],
            withCredentials: true,
        });

        const socket = socketRef.current;

        socket.on("connect", () => {
            console.log("Connected to socket server", socket.id);
            socket.emit("joinUser", loggedInUserId);
        });

        socket.on("newMessage", (msg: Message) => {
            if (selectedChat && msg.chatId === selectedChat.id) {
                setMessages(prev => [...prev, msg]);
            }
            setChats(prev =>
                prev.map(c => (c.id === msg.chatId ? { ...c, lastMessage: msg } : c))
            );
        });

        socket.on("typing", ({ chatId, userName }: { chatId: string; userName: string }) => {
            if (selectedChat && chatId === selectedChat.id && userName !== loggedInUserId) {
                setTypingUser(userName);
                setTimeout(() => setTypingUser(null), 2000);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [selectedChat]);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const data = await ChatAPI.getUserChats();
                setChats(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchChats();
    }, []);

    const selectChat = async (chat: Chat) => {
        setSelectedChat(chat);
        try {
            const msgs = await ChatAPI.getMessages(chat.id);
            setMessages(msgs);
        } catch (err) {
            console.error(err);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim() || !selectedChat) return;
        try {
            const message = await ChatAPI.sendMessage({ chatId: selectedChat.id, text: newMessage });
            setMessages(prev => [...prev, message]);
            setNewMessage("");
            socketRef.current?.emit("sendMessage", message);
        } catch (err) {
            console.error(err);
        }
    };

    const handleTyping = () => {
        if (selectedChat && newMessage.trim()) {
            socketRef.current?.emit("typing", { chatId: selectedChat.id, userName: loggedInUserId });
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
                        const firstName = otherUser?.name?.split(" ")[0] || "Unknown";
                        const avatarSrc = otherUser?.avatar || "/default-avatar.png";

                        return (
                            <div
                                key={chat.id}
                                onClick={() => selectChat(chat)}
                                className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 transition-colors border-b ${selectedChat?.id === chat.id ? "bg-gray-100" : ""
                                    }`}
                            >
                                <div className="w-10 h-10 relative mr-3">
                                    <Image src={avatarSrc} alt={firstName} fill className="rounded-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800">{firstName}</p>
                                    <p className="text-gray-500 text-sm truncate">{chat.lastMessage?.text || "No messages yet"}</p>
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
                        const avatarSrc = msg.senderAvatar || "/default-avatar.png";

                        return (
                            <div
                                key={msg.id}
                                className="flex gap-2 max-w-[70%] self-start" // all messages same side
                            >
                                <div className="w-8 h-8 relative mt-1">
                                    <Image src={avatarSrc} alt={msg.senderName} fill className="rounded-full object-cover" />
                                </div>
                                <div className="px-4 py-2 rounded-2xl break-words shadow-md bg-gray-200 text-gray-800">
                                    <p className="font-semibold text-sm">{msg.senderName}</p>
                                    <p>{msg.text}</p>
                                </div>
                            </div>
                        );
                    })}

                    {typingUser && (
                        <div className="flex items-center gap-2 self-start mt-2">
                            <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
                            <div className="px-4 py-2 bg-gray-200 rounded-2xl text-gray-700">{typingUser} is typing...</div>
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
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 rounded-r-2xl transition-colors"
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
