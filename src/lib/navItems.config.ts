import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            title: "Main",
            items: [
                      {
                    title: "Home",
                    href: "/",
                    icon: "Home", // ✅ String
                    roles: [ "USER", "ADMIN"],
                },
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ["USER", "MODERATOR", "ADMIN"],
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["USER", "MODERATOR", "ADMIN"],
                },
            ],
        },

        // ✅ NEW Trip Navigation Section
        {
            title: "Trip Management",
            items: [
                {
                    title: " Trips Managment ",
                    href: role === "ADMIN" ? "/admin/dashboard/trip-managment" :  "/dashboard/trip" ,
                    icon: "Map",
                    roles: ["USER", "ADMIN"],
                },


            ],
        },

        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings",
                    roles: ["USER"],
                },
            ],
        },
    ];
};

export const adminNavItems: NavSection[] = [
    {
        title: "Admin Panel",
        items: [
            {
                title: "Admins",
                href: "/admin/dashboard/admins-management",
                icon: "Shield",
                roles: ["ADMIN"],
            },
            {
                title: "Traveler Management",
                href: "/admin/dashboard/traveler-management",
                icon: "Users",
                roles: ["ADMIN", "MODERATOR"],
            },
            {
                title: "Traveler Reported",
                href: "/admin/dashboard/repoter-traveler-management",
                icon: "Users",
                roles: ["ADMIN", "MODERATOR"],
            },
            {
                title: "Subcription Planing ",
                href: "/admin/dashboard/subscription-plan",
                icon: "Users",
                roles: ["ADMIN", "MODERATOR"],
            },
            
        ],
    },
];

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
