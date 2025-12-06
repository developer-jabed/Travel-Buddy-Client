// components/shared/cell/ReportStatusBadge.tsx
"use client";

import { Badge } from "@/components/ui/badge";

export const ReportStatusBadge = ({ status }: { status: "PENDING" | "RESOLVED" | "REJECTED" }) => {
    if (status === "PENDING") return <Badge variant="secondary">Pending</Badge>;
    if (status === "RESOLVED") return <Badge variant="success">Resolved</Badge>;
    return <Badge variant="destructive">Rejected</Badge>;
};
