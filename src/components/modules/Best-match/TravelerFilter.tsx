"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { LucideRefreshCw } from "lucide-react";
import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import "react-datepicker/dist/react-datepicker.css";

export default function TravelerFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Helper: push current URL params
  const updateQuery = () => {
    const params = new URLSearchParams(searchParams.toString());
    router.replace(`/traveler?${params.toString()}`);
  };

  // Refresh filters
  const refreshFilters = () => {
    updateQuery();
  };

  return (
    <div className="bg-white p-4 flex flex-col rounded-xl gap-5 shadow-md border border-gray-200">
      {/* Row 1: Search + Refresh */}
      <div className="flex items-center gap-3">
        <SearchFilter paramName="searchTerm" placeholder="Search travelers..." />
        <SearchFilter paramName="city" placeholder="City" />
        <SearchFilter paramName="country" placeholder="Country" />
        <button
          type="button"
          onClick={refreshFilters}
          className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded flex items-center gap-1"
        >
          <LucideRefreshCw size={16} /> Refresh
        </button>
      </div>

      {/* Row 2: Travel Style + Clear */}
      <div className="flex items-center gap-3 flex-row">
        <SelectFilter
          paramName="travelStyle"
          placeholder="Travel Style"
          options={[
            { label: "Backpacking", value: "BACKPACKING" },
            { label: "Luxury", value: "LUXURY" },
            { label: "Adventure", value: "ADVENTURE" },
            { label: "Cultural", value: "CULTURAL" },
            { label: "Relaxation", value: "RELAXATION" },
          ]}
        />

        <ClearFiltersButton />
      </div>
    </div>
  );
}
