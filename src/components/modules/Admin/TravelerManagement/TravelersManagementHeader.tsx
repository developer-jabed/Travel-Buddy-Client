// components/modules/Travelers/TravelersManagement/TravelersManagementHeader.tsx
"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";

const TravelersManagementHeader = () => {
  return (
    <ManagementPageHeader
      title="Travelers Management"
      description="View traveler profiles and toggle active/inactive status"
    />
  );
};

export default TravelersManagementHeader;
