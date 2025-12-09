/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getRecommendedMatchTravelers } from "@/services/Traveler/RecomendedTraveler";

export default function TravelerRecomended() {
    const [travelers, setTravelers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function load() {
            const res = await getRecommendedMatchTravelers();
            if (res.success) setTravelers(res.data);
            setLoading(false);
        }
        load();
    }, []);

    if (loading) {
        return (
            <div className="w-full flex justify-center py-20">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
                />
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 max-w-6xl mx-auto">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center"
            >
                ✨ Recommended Travel Buddies for You
            </motion.h1>

            {travelers.length === 0 ? (
                <div className="text-center text-gray-500 text-lg">
                    No matching travelers found.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {travelers.map((t, index) => (
                        <motion.div
                            key={t.userId}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="
                                bg-white rounded-xl shadow-lg p-5 border border-gray-200 
                                hover:shadow-xl transition duration-300
                                w-full flex flex-col justify-between
                                min-h-[450px]
                            "
                        >
                            <div>
                                {/* Profile Section */}
                                <div className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border">
                                        <Image
                                            src={t.profilePhoto || "/default-avatar.png"}
                                            alt={t.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 100px"
                                        />
                                    </div>

                                    <div className="min-w-0">
                                        <h2 className="text-lg sm:text-xl font-semibold truncate">
                                            {t.name}
                                        </h2>
                                        <p className="text-gray-500 text-sm truncate">
                                            {t.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Match Score */}
                                <div className="mt-4">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium text-gray-800">
                                            Match Score
                                        </span>
                                        <span className="text-sm font-bold text-blue-600">
                                            {t.matchPercentage}%
                                        </span>
                                    </div>

                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${t.matchPercentage}%` }}
                                            transition={{ duration: 0.8 }}
                                            className="h-2 bg-blue-500 rounded-full"
                                        />
                                    </div>
                                </div>

                                {/* Traveler Details */}
                                <div className="mt-4 text-sm text-gray-700 space-y-1 break-words">
                                    <p>
                                        <span className="font-semibold">🌍 Location:</span>{" "}
                                        {t.city}, {t.country}
                                    </p>

                                    <p>
                                        <span className="font-semibold">👜 Travel Style:</span>{" "}
                                        {t.travelStyle}
                                    </p>

                                    <p className="mt-2">
                                        <span className="font-semibold">🎯 Interests:</span>{" "}
                                        {t.interests?.length > 0
                                            ? t.interests.join(", ")
                                            : "No interests"}
                                    </p>

                                    <p className="mt-2">
                                        <span className="font-semibold">🗣 Languages:</span>{" "}
                                        {t.languages?.length > 0
                                            ? t.languages.join(", ")
                                            : "No languages"}
                                    </p>
                                </div>

                                {/* Match Reasons */}
                                {t.matchReasons?.length > 0 && (
                                    <div className="mt-4 bg-blue-50 p-3 rounded-lg text-sm max-h-24 overflow-y-auto">
                                        <p className="font-semibold mb-1 text-blue-700">
                                            Why you match:
                                        </p>

                                        <ul className="list-disc ml-5 text-blue-600 break-words">
                                            {t.matchReasons.map((r: string, i: number) => (
                                                <li key={i}>{r}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* BUTTON */}
                            <div className="mt-5">
                                <motion.div whileTap={{ scale: 0.9 }}>
                                    <Button
                                        variant="outline"
                                        className="rounded-xl w-full"
                                        onClick={() =>
                                            router.push(`/best-match/${t.travelerProfileId}`)
                                        }
                                    >
                                        View Details
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
