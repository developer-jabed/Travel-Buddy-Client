""

import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);
    // console.log(role)

    return [
        {
            items: [
                
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ["USER", "MODERATOR", "ADMIN"],
                },
                // {
                //     title: "Best-Match",
                //     href: `/dashboard/best-match`,
                //     icon: "LayoutDashboard",
                //     roles: ["USER"],
                // },
                // {
                //     title: "Trip",
                //     href: `/dashboard/trip`,
                //     icon: "User",
                //     roles: ["USER"],
                // },
                // {
                //     title: "Buddy-Request",
                //     href: `/dashboard/subscription`,
                //     icon: "User",
                //     roles: ["USER", "MODERATOR", "ADMIN"],
                // },
                {
                    title: "My Profile",
                    href: `/dashboard/`,
                    icon: "User",
                    roles: ["USER", "MODERATOR", "ADMIN"],
                },
                
                

            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings", // ✅ String
                    roles: ["USER"],
                },
            ],
        },
    ]
}




export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Admins",
                href: "/admin/dashboard/admins-management",
                icon: "Shield", // ✅ String
                roles: ["ADMIN"],
            },
   
         
        ],
    },
  
]
export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];

    case "USER":
    case "MODERATOR":
      return [...commonNavItems];

    default:
      return [];
  }
};
