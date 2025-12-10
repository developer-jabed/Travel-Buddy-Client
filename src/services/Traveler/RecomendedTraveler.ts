/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

// ------------------------------------------------------
// GET RECOMMENDED TRAVELERS (filters + pagination)
// ------------------------------------------------------

export async function getRecommendedTravelers(
  queryString: string = ""
): Promise<{
  success: boolean;
  message: string;
  data: any[];
  meta: any;
}> {
  try {
    const url = queryString ? `/traveler?${queryString}` : `/traveler`;

    const response = await serverFetch.get(url, {
      cache: "no-store",
      next: { tags: ["recommended-travelers"] },
    });

    if (!response.ok) {
      return {
        success: false,
        message: `Request failed with status ${response.status}`,
        data: [],
        meta: null,
      };
    }

    const result = await response.json();

    if (!result?.success) {
      return {
        success: false,
        message: result?.message || "Failed to fetch travelers",
        data: [],
        meta: result?.meta || null,
      };
    }

    return {
      success: true,
      message: result.message || "Travelers fetched successfully",
      data: result.data ?? [],
      meta: result.meta ?? null,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error?.message
          : "Failed to fetch travelers",
      data: [],
      meta: null,
    };
  }
}
export async function getRecommendedMatchTravelers(): Promise<any> {
  try {
    const response = await serverFetch.get("/traveler/recommendations", {
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
