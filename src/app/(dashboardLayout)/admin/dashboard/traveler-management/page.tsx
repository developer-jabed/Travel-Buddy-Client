// app/(admin)/travellers/page.tsx
import TravelersFilter from "@/components/modules/Admin/TravelerManagement/TravelersFilter";
import TravelersManagementHeader from "@/components/modules/Admin/TravelerManagement/TravelersManagementHeader";
import TravelersTable from "@/components/modules/Admin/TravelerManagement/TravelersTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getTravelers } from "@/services/Admin/travlerManagment/traveler-management";
import { Suspense } from "react";

export const dynamic = "force-dynamic";


const AdminTravelersManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const travelersResult = await getTravelers(queryString);
  console.log(travelersResult)

  const totalPages = Math.ceil(
    (travelersResult?.meta?.total || 1) / (travelersResult?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      <TravelersManagementHeader />

      <TravelersFilter />

      <Suspense fallback={<TableSkeleton columns={6} rows={8} />}>
        <TravelersTable travelers={travelersResult?.data || []} />
        <TablePagination
          currentPage={travelersResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default AdminTravelersManagementPage;
