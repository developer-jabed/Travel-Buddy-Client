/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export interface IPaginationQuery {
    page?: number;
    limit?: number;
    searchTerm?: string;
}

export interface ICreateSubscriptionPayload {
    plan: string;
    amount: number;
    paymentMethodId: string; // required because your backend expects it
}


// ----------------------------------------------------
// CREATE SUBSCRIPTION
// ----------------------------------------------------
export async function createSubscription(payload: ICreateSubscriptionPayload) {
    try {
        const res = await serverFetch.post("/subscriptions", {
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" },
        });

        return await res.json();
    } catch (error: any) {
        return {
            success: false,
            message: error.message ?? "Failed to create subscription",
        };
    }
}

// ----------------------------------------------------
// GET ALL SUBSCRIPTIONS (ADMIN)
// ----------------------------------------------------
export async function getAllSubscriptions(query: IPaginationQuery = {}) {
    try {
        const queryString = new URLSearchParams(
            query as Record<string, string>
        ).toString();

        const res = await serverFetch.get(`/subscription?${queryString}`);

        return await res.json();
    } catch (error: any) {
        return {
            success: false,
            message: error.message ?? "Failed to fetch subscriptions",
        };
    }
}

// ----------------------------------------------------
// GET SUBSCRIPTION BY ID
// ----------------------------------------------------
export async function getSubscriptionById(id: string) {
    try {
        const res = await serverFetch.get(`/subscription/${id}`);

        return await res.json();
    } catch (error: any) {
        return {
            success: false,
            message: error.message ?? "Failed to fetch subscription",
        };
    }
}

// ----------------------------------------------------
// UPDATE SUBSCRIPTION (ADMIN)
// ----------------------------------------------------
export async function updateSubscription(id: string, payload: any) {
    try {
        const res = await serverFetch.patch(`/subscription/${id}`, {
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" },
        });

        return await res.json();
    } catch (error: any) {
        return {
            success: false,
            message: error.message ?? "Failed to update subscription",
        };
    }
}

// ----------------------------------------------------
// DELETE SUBSCRIPTION (ADMIN)
// ----------------------------------------------------
export async function deleteSubscription(id: string) {
    try {
        const res = await serverFetch.delete(`/subscription/${id}`);

        return await res.json();
    } catch (error: any) {
        return {
            success: false,
            message: error.message ?? "Failed to delete subscription",
        };
    }
}
