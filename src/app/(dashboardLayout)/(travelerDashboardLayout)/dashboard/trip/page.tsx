
import TablePagination from "@/components/shared/TablePagination";

import { Suspense } from "react";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import TripCart from "@/components/modules/TripManagment/TripCart";
import { getOwnTrips } from "@/services/trip/trip.service";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TripPage = async ({  }: any) => {

  const tripsResult = await getOwnTrips();

  const totalPages = Math.ceil(
    (tripsResult?.data?.meta?.total || 1) /
      (tripsResult?.data?.meta?.limit || 1)
  );

  return (
    <div className="space-y-8 container mx-auto px-4 py-8">

      <Suspense fallback={<TableSkeleton columns={3} rows={3} />}>
        <TripCart trips={tripsResult?.data?.data || []} />
        <TablePagination
          currentPage={tripsResult?.data?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default TripPage;
