"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { ITravelerProfile } from "@/types/TravelerProfile.interface";

export const travelersColumns: Column<ITravelerProfile>[] = [
    {
        header: "Traveler",
        accessor: (t) => (
            <UserInfoCell name={t.name} email={t.email} photo={t.profilePhoto} />
        ),
        sortKey: "name",
    },
    {
        header: "Travel Style",
        accessor: (t) => <div className="text-sm">{t.travelStyle || "—"}</div>,
    },
    {
        header: "Location",
        accessor: (t) => (
            <div className="text-sm">
                {t.city
                    ? `${t.city}${t.country ? `, ${t.country}` : ""}`
                    : t.country || "—"}
            </div>
        ),
    },

    // ✅ FIXED: Make sure value is boolean
    {
        header: "Status",
        accessor: (t) => <StatusBadgeCell isDeleted={!!t.isDeleted} />,
    },

    {
        header: "Joined",
        accessor: (t) => <DateCell date={t.createdAt} />,
        sortKey: "createdAt",
    },
];
