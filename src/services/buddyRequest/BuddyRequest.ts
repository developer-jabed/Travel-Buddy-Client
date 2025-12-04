/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

// -----------------------------
// TYPES
// -----------------------------
export interface IBuddyRequestPayload {
  receiverId: string;
  tripId?: string | null;
}

export type BuddyRequestStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface IBuddyRequestUpdatePayload {
  status: BuddyRequestStatus;
}


// -----------------------------
// CREATE BUDDY REQUEST
// -----------------------------
export async function createBuddyRequest(payload: IBuddyRequestPayload) {
  try {
    const res = await serverFetch.post("/buddy", {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message ?? "Failed to send buddy request",
    };
  }
}


// -----------------------------
// GET RECEIVED BUDDY REQUESTS
// (Only requests where logged-in user = receiver)
// -----------------------------
export async function getReceivedBuddyRequests(queryString: string = "") {
  try {
    const res = await serverFetch.get(`/buddy${queryString}`);

    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}


// -----------------------------
// GET SENT BUDDY REQUESTS
// (Only requests where logged-in user = sender)
// -----------------------------
export async function getSentBuddyRequests(queryString: string = "") {
  try {
    const res = await serverFetch.get(`/buddy/own${queryString}`);

    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}


// -----------------------------
// UPDATE BUDDY REQUEST STATUS
// (Accept / Reject Request)
// -----------------------------
export async function updateBuddyRequest(
  requestId: string,
  payload: IBuddyRequestUpdatePayload
  
) {
  try {
    const res = await serverFetch.patch(`/buddy/${requestId}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      
    });

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message ?? "Failed to update buddy request",
    };
  }
}
