import TripFilter from "@/components/modules/Trip/TripFilter";
import TripCart from "@/components/modules/Trip/TripCart";
import TablePagination from "@/components/shared/TablePagination";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllTrips } from "@/services/trip/trip.service";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
export const dynamic = "force-dynamic";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TripPage = async ({ searchParams }: any) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const tripsResult = await getAllTrips(queryString);

  const totalPages = Math.ceil(
    (tripsResult?.data?.meta?.total || 1) /
      (tripsResult?.data?.meta?.limit || 1)
  );

  return (
    <div className="space-y-8 container mx-auto px-4 py-8">
      <TripFilter />

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
