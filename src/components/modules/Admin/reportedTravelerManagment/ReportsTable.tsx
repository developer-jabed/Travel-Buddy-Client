/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { reportsColumns } from "./reportsColumns";
import ReportViewDetailDialog from "./ReportViewDetailDialog";

import { IReport } from "@/types/Report.interface";
import { getReportById, deleteReport, updateReportStatus } from "@/services/Admin/reportedTraveler/reportedTraveler";

interface ReportsTableProps {
  reports: IReport[];
}

const ReportsTable = ({ reports }: ReportsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [viewingReport, setViewingReport] = useState<IReport | null>(null);
  const [deletingReport, setDeletingReport] = useState<IReport | null>(null);
  const [changingStatus, setChangingStatus] = useState<{
    report: IReport;
    status: "RESOLVED" | "REJECTED";
  } | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleView = async (report: IReport) => {
    try {
      const res = await getReportById(report.id);
      setViewingReport(res?.data || report);
    } catch {
      setViewingReport(report);
    }
  };

  const handleConfirmStatus = async () => {
    if (!changingStatus) return;
    setIsProcessing(true);

    const { report, status } = changingStatus;

    const res = await updateReportStatus(report.id, status);

    if (res.success) {
      toast.success("Report status updated");
      startTransition(() => router.refresh());
      setChangingStatus(null);
      setViewingReport(null);
    } else {
      toast.error(res.message || "Failed to update status");
    }

    setIsProcessing(false);
  };

  const handleDelete = async () => {
    if (!deletingReport) return;

    setIsProcessing(true);
    const res = await deleteReport(deletingReport.id);

    if (res.success) {
      toast.success("Report deleted");
      startTransition(() => router.refresh());
      setDeletingReport(null);
    } else {
      toast.error(res.message || "Failed to delete report");
    }

    setIsProcessing(false);
  };

  return (
    <>
      <ManagementTable
        data={reports}
        columns={reportsColumns}
        onView={handleView}
        onDelete={(report) => setDeletingReport(report)}
        getRowKey={(r) => r.id}
        emptyMessage="No reports found"
      />

      {/* VIEW DIALOG */}
      <ReportViewDetailDialog
        open={!!viewingReport}
        onClose={() => setViewingReport(null)}
        report={viewingReport}
        onChangeStatus={(report, status) =>
          setChangingStatus({ report, status })
        }
      />

      {/* STATUS CONFIRMATION DIALOG */}
      <DeleteConfirmationDialog
        open={!!changingStatus}
        onOpenChange={(open) => !open && setChangingStatus(null)}
        onConfirm={handleConfirmStatus}
        title="Change Report Status"
        description={`Are you sure you want to mark this report as ${changingStatus?.status}?`}
        isDeleting={isProcessing}
      />

      {/* DELETE CONFIRMATION */}
      <DeleteConfirmationDialog
        open={!!deletingReport}
        onOpenChange={(open) => !open && setDeletingReport(null)}
        onConfirm={handleDelete}
        title="Delete Report"
        description="Are you sure you want to delete this report?"
        isDeleting={isProcessing}
      />
    </>
  );
};

export default ReportsTable;
