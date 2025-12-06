"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IReport } from "@/types/Report.interface";

export interface ReportViewDetailDialogProps {
  open: boolean;
  onClose: () => void;
  report: IReport | null;
  onChangeStatus: (report: IReport, status: "RESOLVED" | "REJECTED") => void;
}

const ReportViewDetailDialog = ({
  open,
  onClose,
  report,
  onChangeStatus,
}: ReportViewDetailDialogProps) => {
  if (!report) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Report Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          <p><b>ID:</b> {report.id}</p>

          <p><b>Reporter Name:</b> {report.reporter?.name || "—"}</p>
          <p><b>Reporter Email:</b> {report.reporter?.email || "—"}</p>

          <p><b>Reported User:</b> {report.reported?.name || "—"}</p>
          <p><b>Reported Email:</b> {report.reported?.email || "—"}</p>

          <p><b>Reason:</b> {report.reason}</p>
          <p><b>Status:</b> {report.status}</p>

          <p><b>Created At:</b> {new Date(report.createdAt).toLocaleString()}</p>
          <p><b>Updated At:</b> {new Date(report.updatedAt).toLocaleString()}</p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-between mt-6">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>

          <div className="flex gap-2">
            <Button
              variant="destructive"
              onClick={() => onChangeStatus(report, "REJECTED")}
            >
              Reject
            </Button>

            <Button
              variant="secondary"
              onClick={() => onChangeStatus(report, "RESOLVED")}
            >
              Resolve
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportViewDetailDialog;
