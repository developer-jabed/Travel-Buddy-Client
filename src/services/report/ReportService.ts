/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch";
import { IReport } from "@/types/Report.interface";
import { revalidateTag } from "next/cache";

export async function createReport(payload: Partial<IReport>) {
    try {
        const res = await serverFetch.post("/report", {
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" },
        });

        return await res.json();
    } catch (error: any) {
        return {
            success: false,
            message: error.message ?? "Failed to submit report",
        };
    }
}

export async function getAllReports(): Promise<any> {
    try {
        const response = await serverFetch.get(`/report`, {
            next: {
                tags: ["reports-list"],
                revalidate: 180,
            }
        });
        return await response.json();
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch reports",
        };
    }
}

export async function getReportById(id: string): Promise<any> {
    try {
        const response = await serverFetch.get(`/report/${id}`, {
            next: {
                tags: [`report-${id}`, "reports-list"],
                revalidate: 180,
            }
        });
        return await response.json();
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch report",
        };
    }
}

export async function updateReportStatus(
    id: string,
    data: { status: "PENDING" | "RESOLVED" | "REJECTED" }
): Promise<any> {
    try {
        const res = await serverFetch.put(`/report/${id}/status`, {
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });

        const result = await res.json();
        if (result.success) {
            revalidateTag("reports-list", { expire: 0 });
        }
        return result;
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to update report status",
        };
    }
}


export async function deleteReport(id: string): Promise<any> {
    try {
        const response = await serverFetch.delete(`/report/${id}`);
        const result = await response.json();
        if (result.success) {
            revalidateTag("reports-list", { expire: 0 });
        }
        return result;
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to delete report",
        };
    }
}
