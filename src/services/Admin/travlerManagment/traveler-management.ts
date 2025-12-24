/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

/**
 * GET ALL TRAVELERS
 */
export async function getTravelers(queryString?: string) {
    try {

        const searchParams = new URLSearchParams(queryString);
        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "";
        const response = await serverFetch.get(
            `/traveler${queryString ? `?${queryString}` : ""}`, {
            next: {
                tags: [
                    "travelers-list",
                    `travelers-pages-${page}`,
                    `travelers-search-${searchTerm || "all"}`
                ],
                revalidate: 180,
            }
        }
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
        const response = await serverFetch.get(`/traveler/${id}`, {
            next: {
                tags: [`traveler-${id}`, `traveler-details-${id}`, "travelers-list"],
                revalidate: 180,
            }
        });
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
        const result = await response.json();

        if (result.success) {
            revalidateTag("travelers-list", { expire: 0 });
            revalidateTag("travelers-page-1", { expire: 0 });
        }
    return result;
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
