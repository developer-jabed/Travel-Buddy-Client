"use client";

import { useState, useEffect } from "react";
import { getCookie } from "@/services/auth/tokenHandlers";
import { Menu, Bell } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import LogoutButton from "./LogoutButton";
import { INotification } from "@/types/Notification.interface";
import { getMyNotifications, markNotificationAsRead } from "@/services/Notification/Notification.service";

const PublicNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Check login
  useEffect(() => {
    getCookie("accessToken").then(token => setIsLoggedIn(!!token));
  }, []);

  // Fetch notifications
  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchNotifications = async () => {
      const res = await getMyNotifications();
      if (res.success) {
        const data: INotification[] = Array.isArray(res.data) ? res.data : [];
        setNotifications(data);
        setUnreadCount(data.filter(n => !n.isRead).length);
      }
    };

    fetchNotifications();
  }, [isLoggedIn]);

  const handleMarkAsRead = async (id: string) => {
    const res = await markNotificationAsRead(id);
    if (res.success) {
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount(prev => Math.max(prev - 1, 0));
    }
  };

  const navItems = [
    { href: "/best-match", label: "Traveler" },
    { href: "/trip", label: "Trip" },
    { href: "/request", label: "Buddy Request" },
    { href: "/chat", label: "Chat" },
    { href: "/subscription", label: "Subscription" },
    { href: "/about", label: "About" },
  ];

  if (isLoggedIn) navItems.push({ href: "/dashboard", label: "Dashboard" });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur dark:bg-background/95">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">Travel Buddy</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map(link => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-2">

          {/* Notification Icon */}
          {isLoggedIn && (
            <Sheet>
              <SheetTrigger asChild>
                <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
                  <Bell />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] p-4">
                <SheetTitle>Notifications</SheetTitle>
                <div className="mt-4 flex flex-col gap-2">
                  {notifications.length === 0 && (
                    <p className="text-sm text-gray-500">No notifications</p>
                  )}
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 flex justify-between items-center ${
                        !n.isRead ? "bg-gray-200" : "bg-white"
                      }`}
                    >
                      <div>
                        <p className="text-sm">{n.message}</p>
                        {n.link && (
                          <Link href={n.link} className="text-blue-600 text-xs mt-1 inline-block">
                            View
                          </Link>
                        )}
                        <p className="text-gray-400 text-xs mt-1">
                          {new Date(n.createdAt).toLocaleString()}
                        </p>
                      </div>
                      {!n.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(n.id)}
                          className="ml-2 text-xs text-blue-500 hover:underline"
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          )}

          {/* Login/Logout */}
          {isLoggedIn ? (
            <LogoutButton />
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map(link => (
                  <Link key={link.label} href={link.href} className="text-lg font-medium">{link.label}</Link>
                ))}
                <div className="border-t pt-4 flex flex-col space-y-4">
                  {isLoggedIn ? <LogoutButton /> : <Link href="/login"><Button>Login</Button></Link>}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
};

export default PublicNavbar;
