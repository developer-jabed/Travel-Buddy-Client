"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { LucideRefreshCw } from "lucide-react";
import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";

export default function AdminTripFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const updateQuery = () => {
        const params = new URLSearchParams(searchParams.toString());
        router.replace(`/trip?${params.toString()}`);
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-md border space-y-4">
            {/* Search Row */}
            <div className="flex items-center gap-3">
                <SearchFilter
                    paramName="searchTerm"
                    placeholder="Search trips..."
                />

                <button
                    type="button"
                    onClick={updateQuery}
                    className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded flex items-center gap-1"
                >
                    <LucideRefreshCw size={16} /> Refresh
                </button>
            </div>

            {/* Filters Row */}
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
