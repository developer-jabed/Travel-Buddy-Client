/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function getRecommendedTravelers(): Promise<any> {
  try {
    const response = await serverFetch.get("/traveler", {
      cache: "no-store", // always fetch latest
      next: { tags: ["recommended-travelers"] },
    });

    const result = await response.json();
    console.log(result)

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch recommended travelers",
        data: [],
      };
    }

    return {
      success: true,
      message: result.message || "Recommended travelers fetched successfully",
      data: result.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch recommended travelers",
      data: [],
    };
  }
}


export async function getTravelerById(id: string): Promise<any> {
  try {
    const response = await serverFetch.get(`/traveler/${id}`, {
      cache: "no-store", // always fetch latest
      next: { tags: ["traveler-details"] },
    });

    const result = await response.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch traveler profile",
        data: null,
      };
    }

    return {
      success: true,
      message: result.message || "Traveler profile fetched successfully",
      data: result.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch traveler profile",
      data: null,
    };
  }
}