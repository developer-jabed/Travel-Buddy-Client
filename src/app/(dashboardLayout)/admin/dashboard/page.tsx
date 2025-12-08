// app/dashboard/page.tsx
import TravelDashboard from "@/components/modules/Meta/Meta";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div>
      <TravelDashboard />
    </div>
  );
}
