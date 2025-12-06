// components/modules/Travelers/TravelersManagement/TravelersFilter.tsx
"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";

const TravelersFilter = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <SearchFilter paramName="searchTerm" placeholder="Search travelers..." />
        <RefreshButton />
      </div>

      <div className="flex items-center gap-3">
        <SearchFilter paramName="email" placeholder="Email" />
        <SearchFilter paramName="city" placeholder="City" />
        <SearchFilter paramName="country" placeholder="Country" />
        <ClearFiltersButton />
      </div>
    </div>
  );
};

export default TravelersFilter;
