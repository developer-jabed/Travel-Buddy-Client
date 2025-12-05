"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavSection } from "@/types/dashboard.interface";
import { UserInfo } from "@/types/user.interface";
import { Bell, Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardMobileSidebar from "./DashboardMobileSidebar";
import UserDropdown from "./UserDropdown";
import { INotification } from "@/types/Notification.interface";
import { getMyNotifications, markNotificationAsRead } from "@/services/Notification/Notification.service";
import { formatDistanceToNow } from "date-fns";

interface DashboardNavbarContentProps {
  userInfo: UserInfo;
  navItems?: NavSection[];
  dashboardHome?: string;
}

const DashboardNavbarContent = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardNavbarContentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Notification state
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkSmallerScreen = () => setIsMobile(window.innerWidth < 768);
    checkSmallerScreen();
    window.addEventListener("resize", checkSmallerScreen);
    return () => window.removeEventListener("resize", checkSmallerScreen);
  }, []);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await getMyNotifications();
      if (res.success && Array.isArray(res.data)) {
        setNotifications(res.data);
        setUnreadCount(res.data.filter(n => !n.isRead).length);
      }
    };
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    const res = await markNotificationAsRead(id);
    if (res.success) {
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount(prev => Math.max(prev - 1, 0));
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">

        {/* Mobile Menu Toggle */}
        <Sheet open={isMobile && isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <DashboardMobileSidebar
              userInfo={userInfo}
              navItems={navItems || []}
              dashboardHome={dashboardHome || ""}
            />
          </SheetContent>
        </Sheet>

        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="pl-9" />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">

          {/* Notification Bell */}
          <Sheet open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 sm:w-96 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Notifications</h2>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 overflow-y-auto max-h-[70vh]">
                {notifications.length === 0 && (
                  <p className="text-gray-500 text-sm">No notifications</p>
                )}
                {notifications.map(n => (
                  <div
                    key={n.id}
                    className={`p-3 border-b rounded cursor-pointer flex justify-between items-center hover:bg-gray-100 ${
                      n.isRead ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <div>
                      <p className="text-sm">{n.message}</p>
                      {n.link && (
                        <a
                          href={n.link}
                          className="text-blue-600 text-xs mt-1 inline-block"
                        >
                          View
                        </a>
                      )}
                      <p className="text-gray-400 text-xs mt-1">
                        {formatDistanceToNow(new Date(n.createdAt))} ago
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

          {/* User Dropdown */}
          <UserDropdown userInfo={userInfo} />
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbarContent;
