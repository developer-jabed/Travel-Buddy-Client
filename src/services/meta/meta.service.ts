/* eslint-disable @typescript-eslint/no-explicit-any */


"use server";

import { serverFetch } from "@/lib/server-fetch";
import { getUserInfo } from "../auth/getUserInfo"; 


export async function getDashboardMetaData() {
  try {

    const userInfo = await getUserInfo();

    if (!userInfo || !userInfo.role) {
      return {
        success: false,
        message: "Authentication required",
        status: 401,
      };
    }

    const roleTag = `${userInfo.role.toLowerCase()}-dashboard-meta`;
    const commonTags = ["dashboard-meta", "meta-data"];


    const response = await serverFetch.get("/meta", {
      next: {
        tags: [roleTag, ...commonTags],

        revalidate: 30,
      },

    });


    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: "Backend returned non-JSON response" };
      }

      return {
        success: false,
        message: errorData.message || `Backend error ${response.status}`,
        status: response.status,
      };
    }

    const result = await response.json();

    if (!result || typeof result !== "object") {
      return {
        success: false,
        message: "Invalid response format from server",
      };
    }

    return {
      success: true,
      data: result,

      role: userInfo.role,
    };
  } catch (error: any) {

    console.error("[getDashboardMetaData] Failed:", {
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    });


    const isDev = process.env.NODE_ENV === "development";

    return {
      success: false,
      message: isDev
        ? error.message || "Internal server error"
        : "Unable to load dashboard data. Please try again later.",
      status: 500,
    };
  }
}