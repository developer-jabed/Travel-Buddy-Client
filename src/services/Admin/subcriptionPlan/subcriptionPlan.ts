/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { ICreateSubscriptionPlanPricing } from "@/types/SubscriptionPlan";



export interface IPaginationQuery {
  page?: number;
  limit?: number;
  searchTerm?: string;
}

// ----------------------------------------------------
// CREATE SUBSCRIPTION PLAN
// ----------------------------------------------------
export async function createSubscriptionPlan(
  payload: ICreateSubscriptionPlanPricing
) {
  try {
    const res = await serverFetch.post("/subscription-plan", {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message ?? "Failed to create subscription plan",
    };
  }
}

// ----------------------------------------------------
// GET ALL PLANS (WITH PAGINATION)
// ----------------------------------------------------
export async function getAllSubscriptionPlans(query: IPaginationQuery = {}) {
  try {
    const queryString = new URLSearchParams(
      query as Record<string, string>
    ).toString();

    const res = await serverFetch.get(
      `/subscription-plan?${queryString}`
    );

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message ?? "Failed to fetch subscription plans",
    };
  }
}

// ----------------------------------------------------
// GET PLAN BY ID
// ----------------------------------------------------
export async function getSubscriptionPlanById(id: string) {
  try {
    const res = await serverFetch.get(`/subscription-plan/${id}`);
    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message ?? "Failed to fetch subscription plan",
    };
  }
}

// ----------------------------------------------------
// UPDATE PLAN
// ----------------------------------------------------
export async function updateSubscriptionPlan(
  id: string,
  payload: ICreateSubscriptionPlanPricing
) {
  try {
    const res = await serverFetch.patch(`/subscription-plan/${id}`, {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message ?? "Failed to update subscription plan",
    };
  }
}

// ----------------------------------------------------
// DELETE PLAN
// ----------------------------------------------------
export async function deleteSubscriptionPlan(id: string) {
  try {
    const res = await serverFetch.delete(`/subscription-plan/${id}`);

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message ?? "Failed to delete subscription plan",
    };
  }
}
