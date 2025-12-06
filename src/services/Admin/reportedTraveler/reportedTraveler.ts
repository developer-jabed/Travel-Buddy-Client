/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

/**
 * GET ALL REPORTS
 * API: GET /report
 */
export async function getReports() {
  try {
    const response = await serverFetch.get("/report");
    return await response.json();
  } catch (error: any) {
    console.error("Get reports error:", error);
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
 * GET REPORT BY ID
 * API: GET /report/:id
 */
export async function getReportById(id: string) {
  try {
    const response = await serverFetch.get(`/report/${id}`);
    return await response.json();
  } catch (error: any) {
    console.error("Get report error:", error);
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
 * UPDATE REPORT STATUS
 * API: PUT /report/:id/status
 * Body: { status: "PENDING" | "RESOLVED" | "REJECTED" }
 */
export async function updateReportStatus(
  id: string,
  status: "PENDING" | "RESOLVED" | "REJECTED"
) {
  try {
    const response = await serverFetch.put(`/report/${id}/status`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    return await response.json();
  } catch (error: any) {
    console.error("Update report status error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to update report",
    };
  }
}

/**
 * DELETE REPORT
 * API: DELETE /report/:id
 */
export async function deleteReport(id: string) {
  try {
    const response = await serverFetch.delete(`/report/${id}`);
    return await response.json();
  } catch (error: any) {
    console.error("Delete report error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to delete report",
    };
  }
}
