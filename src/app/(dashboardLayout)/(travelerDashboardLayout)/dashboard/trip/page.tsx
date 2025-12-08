// app/trip/page.tsx
import { Suspense } from "react";
import TripCartWrapper from "@/components/modules/TripManagment/TripCartWrapper";
import { TableSkeleton } from "@/components/shared/TableSkeleton";

export const dynamic = "force-dynamic";

export default function TripPage() {
  return (
    <div className="space-y-8 container mx-auto px-4 py-8">
      <Suspense fallback={<TableSkeleton columns={3} rows={3} />}>
        <TripCartWrapper />
      </Suspense>
    </div>
  );
}
