/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { getCookie } from "@/services/auth/tokenHandlers";


// -----------------------------
// TYPES
// -----------------------------
export interface IBuddyRequestPayload {
  receiverId: string;
  tripId?: string | null;
}

export type BuddyRequestStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED";

export interface IBuddyRequestUpdatePayload {
  status: BuddyRequestStatus;
}

// -----------------------------
// CREATE BUDDY REQUEST
// -----------------------------


export async function createBuddyRequest(payload: IBuddyRequestPayload) {
  try {
    console.log("Sending payload:", payload);

    const accessToken = await getCookie("accessToken");

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;  
    if (!BASE_URL) {
      throw new Error("Base API URL is missing in .env");
    }

    const res = await fetch(`${BASE_URL}/buddy`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { accesstoken: accessToken } : {}), // send token
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to send buddy request",
    };
  }
}


// -----------------------------
// GET ALL BUDDY REQUESTS (Admin/Moderator)
// -----------------------------
export async function getAllBuddyRequests(filters?: any) {
  try {
    const query = filters ? `?${new URLSearchParams(filters).toString()}` : "";
    const res = await serverFetch.get(`/buddy/own${query}`);
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to fetch buddy requests" };
  }
}

// -----------------------------
// GET OWN BUDDY REQUESTS (Logged-in user)
// -----------------------------
export async function getOwnBuddyRequests(filters?: any) {
  try {
    const query = filters ? `?${new URLSearchParams(filters).toString()}` : "";
    const res = await serverFetch.get(`/buddy-request/own${query}`);
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to fetch own buddy requests" };
  }
}

// -----------------------------
// UPDATE BUDDY REQUEST STATUS
// -----------------------------
export async function updateBuddyRequest(requestId: string, payload: IBuddyRequestUpdatePayload) {
  try {
    const res = await serverFetch.patch(`/buddy-request/${requestId}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to update buddy request" };
  }
}

// -----------------------------
// DELETE BUDDY REQUEST
// -----------------------------
export async function deleteBuddyRequest(requestId: string) {
  try {
    const res = await serverFetch.delete(`/buddy-request/${requestId}`);
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to delete buddy request" };
  }
}
