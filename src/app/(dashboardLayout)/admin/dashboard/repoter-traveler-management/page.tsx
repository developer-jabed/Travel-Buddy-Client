
import ReportsManagementHeader from "@/components/modules/Admin/reportedTravelerManagment/ReportsManagementHeader";
import ReportsTable from "@/components/modules/Admin/reportedTravelerManagment/ReportsTable";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getReports } from "@/services/Admin/reportedTraveler/reportedTraveler";
import { Suspense } from "react";

const AdminReportsPage = async () => {
  const reportsResult = await getReports();
  console.log(reportsResult)
  const reports = reportsResult?.data || [];

  return (
    <div className="space-y-6">
      <ReportsManagementHeader />

      {/* optional Filters placeholder */}
      {/* <ReportsFilter /> */}

      <Suspense fallback={<TableSkeleton columns={6} rows={8} />}>
        <ReportsTable reports={reports} />
      </Suspense>
    </div>
  );
};

export default AdminReportsPage;
