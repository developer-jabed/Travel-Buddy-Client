// components/modules/Reports/reportsColumns.tsx
"use client";

import { Column } from "@/components/shared/ManagementTable";
import { DateCell } from "@/components/shared/cell/DateCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { IReport } from "@/types/Report.interface";
import { ReportStatusBadge } from "./ReportStatusBadge";


export const reportsColumns: Column<IReport>[] = [
  {
    header: "Reporter",
    accessor: (r) => (
      <UserInfoCell
        name={r.reporter?.name || "—"}
        email={r.reporter?.email || "—"}
      />
    ),
  },
  {
    header: "Reason",
    accessor: (r) => (
      <div className="max-w-xl text-sm line-clamp-2">{r.reason}</div>
    ),
  },
  {
    header: "Status",
    accessor: (r) => <ReportStatusBadge status={r.status} />,
  },
  {
    header: "Date",
    accessor: (r) => <DateCell date={r.createdAt} />,
  },

];
