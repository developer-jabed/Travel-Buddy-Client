/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { deleteTrip } from "@/services/trip/trip.service";
import { toast } from "sonner";

export default function TripTable({ trips }: { trips: any[] }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    toast.error("Are you sure you want to delete this trip?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            const result = await deleteTrip(id);

            if (!result?.success) {
              toast.error(result?.message || "Failed to delete trip");
              return;
            }

            toast.success("Trip deleted successfully!");
            router.refresh();

          } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
          }
        },
      },
    });
  };

  if (!trips?.length) {
    return (
      <p className="text-center text-gray-500 py-6">
        No trips found.
      </p>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Safety</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {trips.map((trip: any) => (
            <TableRow key={trip.id}>
              <TableCell>{trip.title}</TableCell>
              <TableCell>{trip.destination}</TableCell>
              <TableCell>{trip.budget}</TableCell>
              <TableCell>{trip.safetyScore}</TableCell>
              <TableCell>{trip.tripStatus}</TableCell>

              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(trip.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
