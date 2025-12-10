/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getRecommendedTravelers } from "@/services/Traveler/RecomendedTraveler";
import TablePagination from "@/components/shared/TablePagination";
import TravelerFilter from "./TravelerFilter";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import TravelersCart from "./TravelerCart";

export default function RecommendedTravelersPage() {
  const params = useSearchParams();

  const [travelers, setTravelers] = useState<any[]>([]);
  const [meta, setMeta] = useState<{ page: number; total: number; limit: number }>({
    page: 1,
    total: 0,
    limit: 12,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadTravelers = async () => {
      setLoading(true);
      setError(null);

      // Convert URL search params to object
      const searchParamsObj: Record<string, string> = {};
      params.forEach((value, key) => {
        if (value !== "") searchParamsObj[key] = value;
      });

      // Convert object → query string
      const queryString = new URLSearchParams(searchParamsObj).toString();

      try {
        const res = await getRecommendedTravelers(queryString);

        if (!isMounted) return;

        if (res?.success) {
          setTravelers(res.data || []);
          setMeta(res.meta || { page: 1, limit: 12, total: 0 });
        } else {
          setError(res?.message || "Failed to load travelers");
        }
      } catch (err: any) {
        if (!isMounted) return;
        setError(err?.message || "Something went wrong");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadTravelers();

    return () => {
      isMounted = false;
    };
  }, [params]);

  const totalPages = Math.max(
    1,
    Math.ceil((meta?.total || 0) / (meta?.limit || 12))
  );

  return (
    <div className="space-y-8">

      <TravelerFilter />

      {loading ? (
        <TableSkeleton columns={3} rows={3} />
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          <TravelersCart travelers={travelers} loading={loading} />
          <TablePagination currentPage={meta.page} totalPages={totalPages} />
        </>
      )}
    </div>
  );
}
