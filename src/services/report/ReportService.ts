/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";
import { IReport } from "@/types/Report.interface";

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
        const response = await serverFetch.get(`/report`);
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
        const response = await serverFetch.get(`/report/${id}`);
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

        return await res.json();
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
        return await response.json();
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
