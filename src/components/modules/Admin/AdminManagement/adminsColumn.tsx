"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { IAdmin } from "@/types/Admin.interface";

export const adminsColumns: Column<IAdmin>[] = [
  {
    header: "Admin",
    accessor: (admin) => (
      <UserInfoCell
        name={admin.name}
        email={admin.email}
        photo={admin.profilePhoto ?? undefined}
      />
    ),
    sortKey: "name",
  },

  {
    header: "Status",
    accessor: (admin) => (
      <StatusBadgeCell isDeleted={admin.isDeleted ?? false} />
    ),
  },

  {
    header: "Joined",
    accessor: (admin) => (
      <DateCell date={admin.createdAt ?? undefined} />
    ),
    sortKey: "createdAt",
  },
];
