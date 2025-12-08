// app/(admin)/trip/page.tsx

import TripTable from "@/components/modules/TripManagmentAdmin/TripTable";
import AdminTripFilter from "@/components/modules/TripManagmentAdmin/AdminTripFilter";
import TablePagination from "@/components/shared/TablePagination";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllTrips } from "@/services/trip/trip.service";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/shared/TableSkeleton";

export const dynamic = "force-dynamic";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function TripPage({ searchParams }: any) {

  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const tripsResult = await getAllTrips(queryString);

  const totalPages = Math.ceil(
    (tripsResult?.data?.meta?.total || 1) /
    (tripsResult?.data?.meta?.limit || 1)
  );

  return (
    <div className="space-y-8 container mx-auto px-4 py-8">
      <AdminTripFilter />

      <Suspense fallback={<TableSkeleton columns={5} rows={5} />}>
        <TripTable trips={tripsResult?.data?.data || []} />
        <TablePagination
          currentPage={tripsResult?.data?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
}
