/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createBuddyRequest } from "@/services/buddyRequest/BuddyRequest";

interface TravelerProfile {
    id?: string;
    name?: string;
    email?: string;
    profilePhoto?: string;
    city?: string;
    country?: string;
    travelStyle?: string;
    interests?: string[];
    languages?: string[];
    user?: {
        id?: string;
        isVerified?: boolean;
        safetyScore?: number;
        reviewsReceived?: any[];
    };
}

export default function TravelersCart({
    travelers,
    loading,

}: {
    travelers: TravelerProfile[];
    loading: boolean;
    currentUser?: any;
}) {
    const [selectedTraveler, setSelectedTraveler] = useState<TravelerProfile | null>(null);
    const router = useRouter();

    // ✨ Handle Buddy Request
    const handleSendBuddyRequest = async (receiverId: string) => {


        try {
            const res = await createBuddyRequest({ receiverId });

            if (res.success) {
                toast.success("Buddy request sent successfully!");
            } else {
                toast.error(res.message || "Failed to send buddy request");
            }
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        }
    };

    if (loading) return <p className="text-center">Loading...</p>;

    if (!travelers?.length)
        return <p className="text-gray-500 text-center mt-6">No travelers found</p>;

    const renderStars = (avgRating?: number | null) => {
        const rating = Math.round(avgRating || 0);
        return (
            <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>
                        ★
                    </span>
                ))}
            </div>
        );
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {travelers.map(
                    (
                        traveler: TravelerProfile & {
                            score?: number;
                            avgRating?: number;
                            totalReviews?: number;
                        }
                    ) => {
                        const id =
                            traveler.id ??
                            traveler.user?.id ??
                            `fallback-${traveler.email ?? traveler.name ?? "unknown"}`;

                        const name = traveler.name ?? "Unknown";
                        const isVerified = traveler.user?.isVerified;

                        return (
                            <div
                                key={id}
                                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition"
                            >
                                {/* Header */}
                                <div className="flex items-center p-4 gap-3 border-b border-gray-200">
                                    <Image
                                        src={traveler.profilePhoto || "/default-avatar.png"}
                                        alt={name}
                                        width={48}
                                        height={48}
                                        className="rounded-full object-cover border-2 border-indigo-400"
                                    />

                                    <div className="flex-1">
                                        <p className="text-gray-800 font-semibold">{name}</p>
                                        <p className="text-gray-500 text-sm">{traveler.email ?? "—"}</p>
                                        <p className="text-gray-400 text-xs">
                                            {traveler.city ?? "—"}, {traveler.country ?? "—"} •{" "}
                                            {traveler.travelStyle ?? "—"}
                                        </p>
                                    </div>

                                    <div className="ml-2">
                                        {isVerified ? (
                                            <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                                                Verified
                                            </span>
                                        ) : (
                                            <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs">
                                                Not Verified
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-4 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {renderStars(traveler.avgRating)}
                                            <span className="text-sm text-gray-600">
                                                ({traveler.totalReviews ?? 0})
                                            </span>
                                        </div>

                                        <div className="text-indigo-700 font-semibold">
                                            Match: {traveler.score ?? 0}%
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {traveler.interests?.slice(0, 6).map((i) => (
                                            <span
                                                key={i}
                                                className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs"
                                            >
                                                {i}
                                            </span>
                                        ))}
                                    </div>

                                    {/* 🔥 Newly Added Buttons */}
                                    <div className="mt-4 pt-3 border-t flex justify-between gap-3">
                                        <motion.div whileTap={{ scale: 0.9 }}>
                                            <Button
                                                variant="outline"
                                                className="rounded-xl w-28"
                                                onClick={() => router.push(`/best-match/${traveler.id}`)}
                                            >
                                                View Details
                                            </Button>
                                        </motion.div>

                                        <motion.div whileTap={{ scale: 0.9 }}>
                                            <Button
                                                variant="default"
                                                className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white w-32"
                                                onClick={() => handleSendBuddyRequest(traveler.user?.id as string)}
                                            >
                                                Send Request
                                            </Button>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                )}
            </div>

            {/* Popup Profile */}
            {selectedTraveler && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                            onClick={() => setSelectedTraveler(null)}
                        >
                            ✕
                        </button>

                        <div className="flex flex-col items-center gap-4">
                            <Image
                                src={selectedTraveler.profilePhoto || "/default-avatar.png"}
                                alt={selectedTraveler.name ?? "Traveler"}
                                width={96}
                                height={96}
                                className="rounded-full border-2 border-indigo-400"
                            />

                            <h2 className="text-xl font-bold">
                                {selectedTraveler.name ?? "—"}
                            </h2>

                            <p className="text-gray-500">{selectedTraveler.email ?? "—"}</p>

                            <p className="text-gray-400 text-sm">
                                {selectedTraveler.city ?? "—"}, {selectedTraveler.country ?? "—"} •{" "}
                                {selectedTraveler.travelStyle ?? "—"}
                            </p>

                            <p className="text-gray-600 text-sm">
                                Interests: {selectedTraveler.interests?.join(", ") || "None"}
                            </p>

                            <p className="text-gray-600 text-sm">
                                Languages: {selectedTraveler.languages?.join(", ") || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
