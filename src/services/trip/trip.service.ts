/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import {  ITripResponse, ITripUpdatePayload } from "@/types/trip.interface";
import { createTripSchema, updateTripSchema } from "@/zod/trip.validation";

// -----------------------------
// -----------------------------
// CREATE TRIP
// -----------------------------
export async function createTrip(formData: FormData): Promise<ITripResponse> {
  const payload: ITripUpdatePayload = {
    title: formData.get("title") as string,
    destination: formData.get("destination") as string,
    startDate: formData.get("startDate") as string,
    endDate: formData.get("endDate") as string,
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
    const response = await serverFetch.post("/trip", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validated.data),
    });

    return await response.json();
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
export async function getAllTrips(queryString?: string): Promise<ITripResponse> {
  try {
    const response = await serverFetch.get(`/trips${queryString ? `?${queryString}` : ""}`);
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
export async function getOwnTrips(queryString?: string): Promise<ITripResponse> {
  try {
    const response = await serverFetch.get(`/trips/own${queryString ? `?${queryString}` : ""}`);
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
export async function getTripById(id: string): Promise<ITripResponse> {
  try {
    const response = await serverFetch.get(`/trips/${id}`);
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
export async function updateTrip(id: string, payload: ITripUpdatePayload): Promise<ITripResponse> {
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
    return await response.json();
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
export async function deleteTrip(id: string): Promise<ITripResponse> {
  try {
    const response = await serverFetch.delete(`/trips/${id}`);
    return await response.json();
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
export async function getRecommendedBuddies(tripId: string): Promise<ITripResponse> {
  try {
    const response = await serverFetch.get(`/trips/recommendations?tripId=${tripId}`);
    return await response.json();
  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch recommendations",
    };
  }
}
