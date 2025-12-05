"use client";

import { useEffect, useState } from "react";
import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import DashboardMobileSidebar from "./DashboardMobileSidebar";
import UserDropdown from "./UserDropdown";
import { UserInfo } from "@/types/user.interface";
import { INotification } from "@/types/Notification.interface";
import { getMyNotifications, markNotificationAsRead } from "@/services/Notification/Notification.service";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { NavSection } from "@/types/dashboard.interface";

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
  const [isOpen, setIsOpen] = useState(false); // Mobile sidebar
  const [isMobile, setIsMobile] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotifOpen, setIsNotifOpen] = useState(false); // Notification sidebar

  // Detect mobile screen
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
      setUnreadCount(prev => prev - 1);
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
          <Sheet open={isNotifOpen} onOpenChange={setIsNotifOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
                )}
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-80 sm:w-96 p-4">
              {/* Accessibility title */}
              <SheetTitle>
                <VisuallyHidden>Notifications</VisuallyHidden>
              </SheetTitle>

              <div className="flex flex-col gap-2 overflow-y-auto max-h-[70vh]">
                {notifications.length === 0 && (
                  <p className="text-sm text-gray-500">No notifications</p>
                )}
                {notifications.map(n => (
                  <div
                    key={n.id}
                    className={`p-3 rounded-lg cursor-pointer flex justify-between items-start gap-2 hover:bg-gray-100 ${
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

          {/* User Dropdown */}
          <UserDropdown userInfo={userInfo} />
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbarContent;
