"use client";


import { useRouter, useSearchParams } from "next/navigation";
import { LucideRefreshCw } from "lucide-react";
import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import "react-datepicker/dist/react-datepicker.css";

export default function AdminTripFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Helper: push current URL params
  const updateQuery = () => {
    const params = new URLSearchParams(searchParams.toString());
    router.replace(`/trip?${params.toString()}`);
  };


  // Refresh filters
  const refreshFilters = () => {
    updateQuery();
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 space-y-4">
      {/* Row 1: Search + Refresh */}
      <div className="flex items-center gap-3">
        <SearchFilter
          paramName="searchTerm"
          placeholder="Search trips..."

        />
        <button
          type="button"
          onClick={refreshFilters}
          className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded flex items-center gap-1"
        >
          <LucideRefreshCw size={16} /> Refresh
        </button>
      </div>

      {/* Row 2: Date, Budget, Status + Clear */}
      <div className="flex items-center gap-3 flex-wrap">
        <SearchFilter paramName="startDate" placeholder="Start Date" type="date" />
        <SearchFilter paramName="endDate" placeholder="End Date" type="date" />
        <SearchFilter paramName="budget" placeholder="Budget" type="number" />
        <SelectFilter
          paramName="tripStatus"
          placeholder="Trip Status"
          options={[
            { label: "Upcoming", value: "UPCOMING" },
            { label: "Ongoing", value: "ONGOING" },
            { label: "Completed", value: "COMPLETED" },
            { label: "Cancelled", value: "CANCELLED" },
          ]}

        />

        <ClearFiltersButton />

      </div>
    </div>
  );
}
