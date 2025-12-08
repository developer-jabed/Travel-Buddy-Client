/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { getRecommendedTravelers } from "@/services/Traveler/RecomendedTraveler";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { createBuddyRequest } from "@/services/buddyRequest/BuddyRequest";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

interface IRecommendedTraveler {
    id: string;
    userId: string;
    name: string;
    email: string;
    profilePhoto?: string;
    city?: string;
    country?: string;
    travelStyle?: string;
    interests?: string[];
    score: number;

    avgRating?: number | null;
    totalReviews?: number | null;
    user: any;
}

export default function RecommendedTravelers() {
    const [travelers, setTravelers] = useState<IRecommendedTraveler[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentUser, setCurrentUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUserInfo();
            setCurrentUser(user);
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchTravelers = async () => {
            setLoading(true);
            setError("");

            try {
                const res = await getRecommendedTravelers();
                if (res.success && res.data) {
                    setTravelers(res.data);
                } else {
                    toast.error(res.message || "Failed to fetch travelers");
                    setError(res.message);
                }
            } catch (err: any) {
                toast.error(err.message || "Something went wrong");
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTravelers();
    }, []);

    const handleSendBuddyRequest = async (receiverId: string) => {
        if (!currentUser?.id) {
            toast.error("Please login to send a buddy request");
            router.push("/login");
            return;
        }

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

    if (loading) return <p className="text-gray-500">Loading recommended travelers...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const filteredTravelers = travelers.filter(
        (t) => t.userId !== currentUser?.id
    );

    if (!filteredTravelers.length)
        return <p className="text-gray-500">No recommended travelers found.</p>;

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= rating ? "text-yellow-500" : "text-gray-300"}>
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4 mb-4 px-4">
            {filteredTravelers.map((traveler, index) => {
                const isValidRating =
                    typeof traveler.avgRating === "number" &&
                    !isNaN(traveler.avgRating) &&
                    traveler.avgRating > 0;

                return (
                    <motion.div
                        key={traveler.userId}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                        whileHover={{ scale: 1.03 }}
                    >
                        <Card className="flex flex-col backdrop-blur-xl bg-white/60 border border-gray-200 shadow-lg rounded-2xl transition-all duration-300">
                            <CardHeader className="flex items-center gap-4 pb-2">
                                <Image
                                    src={traveler.profilePhoto || "/default-avatar.png"}
                                    alt={traveler.name}
                                    width={60}
                                    height={60}
                                    className="rounded-full border-2 border-indigo-400 shadow"
                                />

                                <div>
                                    <CardTitle className="text-gray-900 text-lg">
                                        {traveler.name}
                                    </CardTitle>
                                    <CardDescription className="text-gray-500 text-sm">
                                        {traveler.email}
                                    </CardDescription>
                                </div>
                            </CardHeader>

                            {/* Verified Badge */}
                            <div className="flex items-center gap-2 px-4">
                                {traveler.user?.isVerified ? (
                                    <span className="bg-green-600 text-white flex items-center gap-1 font-semibold text-xs px-3 py-1 rounded-full shadow-md">
                                        <CheckCircle size={14} /> Verified
                                    </span>
                                ) : (
                                    <span className="bg-red-600 text-white flex items-center gap-1 font-semibold text-xs px-3 py-1 rounded-full shadow-md">
                                        <XCircle size={14} /> Not Verified
                                    </span>
                                )}

                            </div>

                            <CardContent className="flex flex-col gap-2 mt-2">

                                {/* ⭐ Ratings */}
                                <div className="flex items-center gap-2">
                                    {isValidRating ? (
                                        <>
                                            <div className="flex">
                                                {renderStars(Math.round(traveler.avgRating!))}
                                            </div>
                                            <span className="text-sm text-gray-600">
                                                ({traveler.totalReviews} reviews)
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-gray-500 text-sm">No reviews yet</span>
                                    )}
                                </div>

                                {/* Interests */}
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {traveler.interests?.map((interest, idx) => (
                                        <Badge key={idx} className="bg-indigo-100 text-indigo-700">
                                            {interest}
                                        </Badge>
                                    ))}
                                </div>

                                <p className="text-gray-600 text-sm">
                                    {traveler.city}, {traveler.country}
                                </p>

                                <p className="text-gray-700 text-sm">
                                    Travel Style: <strong>{traveler.travelStyle}</strong>
                                </p>

                                <Badge variant="outline" className="mt-1 text-indigo-700 border-indigo-400">
                                    Match Score: {traveler.score}%
                                </Badge>
                            </CardContent>

                            <CardFooter className="flex justify-between mt-auto">
                                <motion.div whileTap={{ scale: 0.9 }}>
                                    <Button
                                        variant="outline"
                                        className="rounded-xl"
                                        onClick={() => router.push(`/best-match/${traveler.id}`)}
                                    >
                                        View Details
                                    </Button>
                                </motion.div>

                                <motion.div whileTap={{ scale: 0.9 }}>
                                    <Button
                                        variant="default"
                                        className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
                                        onClick={() => handleSendBuddyRequest(traveler.userId)}
                                    >
                                        Send Request
                                    </Button>
                                </motion.div>
                            </CardFooter>
                        </Card>
                    </motion.div>
                );
            })}
        </div>
    );
}
