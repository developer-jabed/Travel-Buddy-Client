import { Suspense } from "react";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import TripCartWrapper from "@/components/modules/TripManagment/TripCartWrapper";

const TripPage = () => {
  return (
    <div className="space-y-8 container mx-auto px-4 py-8">
      <Suspense fallback={<TableSkeleton columns={3} rows={3} />}>
        <TripCartWrapper />
      </Suspense>
    </div>
  );
};

export default TripPage;
