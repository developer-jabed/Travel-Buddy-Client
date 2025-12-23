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

    if (loading) return <p className="text-center text-gray-500 py-10">Loading...</p>;

    if (!travelers?.length)
        return <p className="text-gray-500 text-center mt-6">No travelers found</p>;

    const renderStars = (avgRating?: number | null) => {
        const rating = Math.round(avgRating || 0);
        return (
            <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <motion.span
                        key={i}
                        className={i < rating ? "text-yellow-400" : "text-gray-300"}
                        whileHover={{ scale: 1.3, color: "#FFD700" }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        ★
                    </motion.span>
                ))}
            </div>
        );
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                            <motion.div
                                key={id}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition"
                            >
                                {/* Header */}
                                <div className="flex items-center p-4 gap-3 border-b border-gray-200">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="w-14 h-14 relative flex-shrink-0"
                                    >
                                        <Image
                                            src={traveler.profilePhoto || "/default-avatar.png"}
                                            alt={name}
                                            fill
                                            className="rounded-full object-cover border-2 border-indigo-400 shadow-md"
                                        />
                                    </motion.div>

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
                                            <motion.span
                                                whileHover={{ scale: 1.1 }}
                                                className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-sm"
                                            >
                                                Verified
                                            </motion.span>
                                        ) : (
                                            <motion.span
                                                whileHover={{ scale: 1.1 }}
                                                className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-sm"
                                            >
                                                Not Verified
                                            </motion.span>
                                        )}
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-4 space-y-3">
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
                                            <motion.span
                                                key={i}
                                                whileHover={{ scale: 1.2, rotate: [-2, 2, 0] }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                                className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-medium cursor-pointer hover:bg-indigo-200"
                                            >
                                                {i}
                                            </motion.span>
                                        ))}
                                    </div>

                                    {/* Buttons */}
                                    <div className="mt-4 pt-3 border-t flex justify-between gap-3">
                                        <motion.div whileTap={{ scale: 0.95 }}>
                                            <Button
                                                variant="outline"
                                                className="rounded-xl w-28 hover:scale-105 transition-transform"
                                                onClick={() => router.push(`/best-match/${traveler.id}`)}
                                            >
                                                View Details
                                            </Button>
                                        </motion.div>

                                        <motion.div whileTap={{ scale: 0.95 }}>
                                            <Button
                                                variant="default"
                                                className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white w-32 shadow-md hover:shadow-xl transition-all"
                                                onClick={() => handleSendBuddyRequest(traveler.user?.id as string)}
                                            >
                                                Send Request
                                            </Button>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    }
                )}
            </div>

            {/* Popup Profile */}
            {selectedTraveler && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                >
                    <div className="bg-white rounded-lg shadow-xl p-6 w-11/12 max-w-md relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                            onClick={() => setSelectedTraveler(null)}
                        >
                            ✕
                        </button>

                        <div className="flex flex-col items-center gap-4">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 3 }}
                                className="w-24 h-24 relative"
                            >
                                <Image
                                    src={selectedTraveler.profilePhoto || "/default-avatar.png"}
                                    alt={selectedTraveler.name ?? "Traveler"}
                                    fill
                                    className="rounded-full border-2 border-indigo-400 shadow-md object-cover"
                                />
                            </motion.div>

                            <h2 className="text-xl font-bold">{selectedTraveler.name ?? "—"}</h2>
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
                </motion.div>
            )}
        </>
    );
}
