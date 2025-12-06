"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import TravelerViewDetailDialog from "./TravelerViewDetailDialog";
import { travelersColumns } from "./travelersColumns";
import { ITravelerProfile } from "@/types/TravelerProfile.interface";
import {
    getTravelerById,
    softDeleteTraveler,
} from "@/services/Admin/travlerManagment/traveler-management";

interface TravelersTableProps {
    travelers: ITravelerProfile[];
}

const TravelersTable = ({ travelers }: TravelersTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();

    const [viewingTraveler, setViewingTraveler] = useState<ITravelerProfile | null>(null);
    const [deletingTraveler, setDeletingTraveler] = useState<ITravelerProfile | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRefresh = () => startTransition(() => router.refresh());

    const handleView = async (traveler: ITravelerProfile) => {
        try {
            const res = await getTravelerById(traveler.id!);
            setViewingTraveler(res?.data || traveler);
        } catch {
            setViewingTraveler(traveler);
        }
    };

    const handleDelete = (traveler: ITravelerProfile) => {
        setDeletingTraveler(traveler);
    };

    const confirmDelete = async () => {
        if (!deletingTraveler) return;

        setIsDeleting(true);
        try {
            const res = await softDeleteTraveler(deletingTraveler.id!);

            setIsDeleting(false);

            if (res.success) {
                toast.success(res.message || "Traveler status updated");
                setDeletingTraveler(null);
                handleRefresh();
            } else {
                toast.error(res.message || "Failed to update traveler");
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setIsDeleting(false);
            toast.error(err?.message || "Failed to update traveler");
        }
    };

    return (
        <>
            <ManagementTable
                data={travelers}
                columns={travelersColumns}
                onView={handleView}
                onEdit={undefined} // no edit
                onDelete={handleDelete}
                getRowKey={(t) => t.id!}
                emptyMessage="No travelers found"
            />

            {/* View dialog */}
            <TravelerViewDetailDialog
                open={!!viewingTraveler}
                onClose={() => setViewingTraveler(null)}
                traveler={viewingTraveler}
            />

            {/* Delete / Activate / Deactivate */}
            <DeleteConfirmationDialog
                open={!!deletingTraveler}
                onOpenChange={(open) => !open && setDeletingTraveler(null)}
                onConfirm={confirmDelete}
                title="Change Traveler Status"
                description={`Are you sure you want to ${
                    deletingTraveler?.isDeleted ? "activate" : "deactivate"
                } ${deletingTraveler?.name}?`}
                isDeleting={isDeleting}
            />
        </>
    );
};

export default TravelersTable;
