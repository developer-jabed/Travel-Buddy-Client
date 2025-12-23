/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getRecommendedMatchTravelers } from "@/services/Traveler/RecomendedTraveler";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";

const VISIBLE_CARDS = 2;
const AUTO_SLIDE_DELAY = 4500;

export default function TravelerRecommendedCarousel() {
    const [travelers, setTravelers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const router = useRouter();

    /* ================= FETCH ================= */
    useEffect(() => {
        (async () => {
            const res = await getRecommendedMatchTravelers();
            if (res?.success) setTravelers(res.data || []);
            setLoading(false);
        })();
    }, []);

    /* ================= SLIDES ================= */
    const slides = useMemo(() => {
        const result = [];
        for (let i = 0; i < travelers.length; i += VISIBLE_CARDS) {
            result.push(travelers.slice(i, i + VISIBLE_CARDS));
        }
        return result;
    }, [travelers]);

    /* ================= AUTO SLIDE ================= */
    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, AUTO_SLIDE_DELAY);
        return () => clearInterval(timer);
    }, [slides.length]);

    /* ================= LOADING ================= */
    if (loading) {
        return (
            <section className="relative mt-5 py-28 flex flex-col w-[95%] mx-auto items-center justify-center bg-gray-200">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    className="w-14 h-14 rounded-full border-[3px] border-primary border-t-transparent"
                />
                <p className="mt-6 text-sm text-muted-foreground">
                    Finding perfect travel buddies...
                </p>
            </section>
        );
    }

    /* ================= EMPTY STATE ================= */
    if (!loading && slides.length === 0) {
        return (
            <section className="relative py-28 w-[94%] mx-auto bg-gray-200 rounded-lg">
                <div className="max-w-xl mx-auto text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white/80 border border-gray-200 rounded-2xl p-8 shadow-md"
                    >
                        <div className="flex justify-center mb-4">
                            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                                <Users className="w-7 h-7 text-gray-600" />
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold mb-2 text-gray-800">
                            No travel suggestions yet
                        </h3>

                        <p className="text-sm text-gray-500 mb-6">
                            If you are an admin, this section will show users once they complete
                            their profiles.
                            <br />
                            Travelers will see suggestions after adding full information and
                            matching with others.
                        </p>

                        <Button
                            onClick={() => router.push("/my-profile")}
                            className="rounded-xl"
                        >
                            Complete Your Profile
                        </Button>
                    </motion.div>
                </div>
            </section>
        );
    }

    /* ================= UI ================= */
    return (
        <section className="relative py-24 w-[95%] mx-auto mt-5 bg-gray-200 overflow-hidden rounded-lg">
            {/* subtle blurred circles for depth */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-gray-200/30 blur-3xl" />
                <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-gray-300/20 blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4">
                {/* TITLE */}
                <motion.h2
                    initial={{ opacity: 0, y: -16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl font-bold text-center mb-12 text-gray-800"
                >
                    ✨ Recommended Travel Buddies
                </motion.h2>

                {/* CAROUSEL WRAPPER */}
                <div className="relative flex items-center">
                    {/* LEFT BUTTON */}
                    {slides.length > 1 && (
                        <button
                            onClick={() =>
                                setIndex((prev) => (prev - 1 + slides.length) % slides.length)
                            }
                            className="hidden md:flex absolute -left-16 z-10 bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-gray-100 transition"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>
                    )}

                    {/* SLIDES */}
                    <div className="flex-1 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{ x: 120, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -120, opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                            >
                                {slides[index].map((traveler: any) => (
                                    <TravelerCard
                                        key={traveler.travelerProfileId}
                                        traveler={traveler}
                                        onView={() =>
                                            router.push(`/best-match/${traveler.travelerProfileId}`)
                                        }
                                    />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* RIGHT BUTTON */}
                    {slides.length > 1 && (
                        <button
                            onClick={() =>
                                setIndex((prev) => (prev + 1) % slides.length)
                            }
                            className="hidden md:flex absolute -right-16 z-10 bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-gray-100 transition"
                        >
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                    )}
                </div>

                {/* DOTS */}
                <div className="flex justify-center gap-2 mt-8">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`h-2 rounded-full transition-all ${i === index ? "bg-primary w-6" : "bg-gray-400 w-2"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ================= CARD ================= */

function TravelerCard({
    traveler,
    onView,
}: {
    traveler: any;
    onView: () => void;
}) {
    return (
        <motion.div
            whileHover={{ y: -6 }}
            className="bg-gray-200 backdrop-blur border border-gray-200 rounded-2xl p-6 shadow-md"
        >
            <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border">
                    <Image
                        src={traveler.profilePhoto || "/default-avatar.png"}
                        alt={traveler.name}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="min-w-0">
                    <h3 className="text-lg font-semibold truncate text-gray-800">
                        {traveler.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                        {traveler.city}, {traveler.country}
                    </p>
                </div>
            </div>

            <div className="mt-5">
                <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Match Score</span>
                    <span className="font-semibold text-primary">{traveler.matchPercentage}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${traveler.matchPercentage}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-primary"
                    />
                </div>
            </div>

            <div className="mt-4 text-sm text-gray-600 space-y-1">
                <p>👜 {traveler.travelStyle}</p>
                <p>🎯 {traveler.interests?.slice(0, 3).join(", ")}</p>
                <p>🗣 {traveler.languages?.slice(0, 3).join(", ")}</p>
            </div>

            <div className="mt-6">
                <Button variant="outline" className="w-full rounded-xl" onClick={onView}>
                    View Details
                </Button>
            </div>
        </motion.div>
    );
}
