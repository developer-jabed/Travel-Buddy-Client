"use client";

import React, { useState, useEffect } from "react";
import TripCart from "./TripCart";
import { getOwnTrips } from "@/services/trip/trip.service";
import { ITrip } from "@/types/trip.interface";
import { toast } from "sonner";

export default function TripCartWrapper() {
  const [trips, setTrips] = useState<ITrip[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshTrips = async () => {
    try {
      setLoading(true);
      const res = await getOwnTrips();
      if (res.success) {
        setTrips(res.data?.data || []);
      } else {
        toast.error("Failed to load trips: " + res.message);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error("Error fetching trips: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshTrips();
  }, []);

  return <TripCart trips={trips} refreshTrips={refreshTrips} loading={loading} />;
}
