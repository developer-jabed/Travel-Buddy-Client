/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

/**
 * GET ALL TRAVELERS
 */
export async function getTravelers(queryString?: string) {
    try {
        const response = await serverFetch.get(
            `/traveler${queryString ? `?${queryString}` : ""}`
        );
        return await response.json();
    } catch (error: any) {
        console.error("Get travelers error:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
        };
    }
}

/**
 * GET TRAVELER BY ID
 */
export async function getTravelerById(id: string) {
    try {
        const response = await serverFetch.get(`/traveler/${id}`);
        return await response.json();
    } catch (error: any) {
        console.error("Get traveler error:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
        };
    }
}

/**
 * SOFT DELETE / RESTORE (Toggle)
 * If traveler is active -> becomes inactive
 * If traveler is inactive -> becomes active
 */
export async function softDeleteTraveler(id: string) {
    try {
        const response = await serverFetch.patch(`/traveler/soft/${id}`);
        return await response.json();
    } catch (error: any) {
        console.error("Soft delete traveler error:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
        };
    }
}
