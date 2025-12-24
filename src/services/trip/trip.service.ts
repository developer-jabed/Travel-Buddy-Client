/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
// import { ITrip } from "@/types/trip.interface";
import { createTripSchema, updateTripSchema } from "@/zod/trip.validation";
import { revalidateTag } from "next/cache";

// -----------------------------
// -----------------------------
// CREATE TRIP
// -----------------------------
export async function createTrip(formData: FormData): Promise<any> {
  const payload: any = {
    title: formData.get("title") as string,
    destination: formData.get("destination") as string,
    // Convert to ISO string with default times
    startDate: new Date(`${formData.get("startDate")}T08:00:00Z`).toISOString(),
    endDate: new Date(`${formData.get("endDate")}T17:00:00Z`).toISOString(),
    budget: formData.get("budget") ? Number(formData.get("budget")) : undefined,
    description: formData.get("description") as string,
    interests: formData.getAll("interests") as string[],
  };

  const validated = zodValidator(payload, createTripSchema);

  if (!validated.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validated.errors,
      data: payload,
    };
  }

  try {
    const response = await serverFetch.post("/trips", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validated.data),
    });

    const result = await response.json();
    if (result.success) {
      revalidateTag("trips-list", { expire: 0 });
      revalidateTag("trips-pages-1", { expire: 0 });// assuming new trip appears on first page
      revalidateTag("trips-search-all", { expire: 0 });// assuming new trip appears in general search
    }

    return result;

  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to create trip",
      data: payload,
    };
  }
}


// -----------------------------
// GET ALL TRIPS (Admin/Moderator)
// -----------------------------
export async function getAllTrips(queryString?: string): Promise<any> {
  try {
    const searchParams = new URLSearchParams(queryString);
    const page = searchParams.get("page") || "1";
    const searchTerm = searchParams.get("searchTerm") || "";
    const response = await serverFetch.get(`/trips${queryString ? `?${queryString}` : ""}`, {
      next: {
        tags: [
          "trips-list",
          `trips-pages-${page}`,
          `trips-search-${searchTerm || "all"}`
        ],
        revalidate: 180,
      }
    });
    return await response.json();
  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch trips",
    };
  }
}

// -----------------------------
// GET OWN TRIPS
// -----------------------------
export async function getOwnTrips(queryString?: string): Promise<any> {
  try {
    const response = await serverFetch.get(`/trips/own${queryString ? `?${queryString}` : ""}`, {
      next: {
        tags: ["trips-list"],
        revalidate: 180,
      }
    });
    return await response.json();
  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch trips",
    };
  }
}

// -----------------------------
// GET TRIP BY ID
// -----------------------------
export async function getTripById(id: string): Promise<any> {
  try {
    const response = await serverFetch.get(`/trips/${id}`, {
      next: {
        tags: [`trip-${id}`, `trip-details-${id}`, "trips-list"],
        revalidate: 180,
      }
    });
    return await response.json();
  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Trip not found",
    };
  }
}

// -----------------------------
// UPDATE TRIP
// -----------------------------
export async function updateTrip(id: string, payload: any): Promise<any> {
  // Convert startDate and endDate to ISO strings if they exist
  if (payload.startDate) {
    payload.startDate = new Date(`${payload.startDate}T08:00:00Z`).toISOString();
  }
  if (payload.endDate) {
    payload.endDate = new Date(`${payload.endDate}T17:00:00Z`).toISOString();
  }

  const validated = zodValidator(payload, updateTripSchema);

  if (!validated.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validated.errors,
      data: payload,
    };
  }

  try {
    const response = await serverFetch.patch(`/trips/${id}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validated.data),
    });
    const result = await response.json();

    if (result.success) {
      revalidateTag("trips-list", { expire: 0 });
      revalidateTag("trips-pages-1", { expire: 0 });// assuming new trip appears on first page
      revalidateTag("trips-search-all", { expire: 0 });// assuming new trip appears in general search
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to update trip",
      data: payload,
    };
  }
}

// -----------------------------
// DELETE TRIP
// -----------------------------
export async function deleteTrip(id: string): Promise<any> {
  try {
    const response = await serverFetch.delete(`/trips/${id}`);
    const result = await response.json();

    if (result.success) {
      revalidateTag("trips-list", { expire: 0 });
      revalidateTag("trips-pages-1", { expire: 0 });// assuming new trip appears on first page
      revalidateTag("trips-search-all", { expire: 0 });// assuming new trip appears in general search
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to delete trip",
    };
  }
}

// -----------------------------
// GET RECOMMENDED BUDDIES
// -----------------------------
export async function getRecommendedBuddies(tripId: string): Promise<any> {
  try {
    const response = await serverFetch.get(`/trips/recommendations?tripId=${tripId}`, {
      next: {
        tags: [`trip-recommendations-${tripId}`],
        revalidate: 360,
      }
    });
    return await response.json();
  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch recommendations",
    };
  }
}
