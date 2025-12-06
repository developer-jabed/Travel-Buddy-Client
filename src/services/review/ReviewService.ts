/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";
import { IReview } from "@/types/Review.interface";

interface CreateReviewInput {
    receiverId: string;
    rating: number;
    comment?: string;
}

interface UpdateReviewInput {
    rating?: number;
    comment?: string;
}

export async function createReview(payload: CreateReviewInput) {
    try {
        const res = await serverFetch.post("/review", {
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" },
        });

        return await res.json();
    } catch (error: any) {
        return {
            success: false,
            message: error.message ?? "Failed to submit review",
        };
    }
}

export async function getAllReviews(): Promise<{
    success: boolean;
    data?: IReview[];
    message?: string;
}> {
    try {
        const response = await serverFetch.get(`/review`);
        return await response.json();
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch reviews",
        };
    }
}

export async function getReviewById(
    id: string
): Promise<{ success: boolean; data?: IReview; message?: string }> {
    try {
        const response = await serverFetch.get(`/review/${id}`);
        return await response.json();
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch review",
        };
    }
}

export async function updateReview(
    id: string,
    data: UpdateReviewInput
): Promise<{ success: boolean; data?: IReview; message?: string }> {
    try {
        const res = await serverFetch.put(`/review/${id}`, {
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
                    : "Failed to update review",
        };
    }
}


export async function deleteReview(
    id: string
): Promise<{ success: boolean; message?: string }> {
    try {
        const response = await serverFetch.delete(`/review/${id}`);
        return await response.json();
    } catch (error: any) {
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to delete review",
        };
    }
}
