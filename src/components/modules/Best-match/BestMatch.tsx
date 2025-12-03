"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getRecommendedTravelers } from "@/services/Traveler/RecomendedTraveler";
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { createBuddyRequest } from "@/services/buddyRequest/BuddyRequest";
import { toast } from "sonner";

interface IRecommendedTraveler {
    userId: string;
    name: string;
    email: string;
    profilePhoto?: string;
    city?: string;
    country?: string;
    travelStyle?: string;
    interests?: string[];
    score: number;
}

export default function RecommendedTravelers() {
    const [travelers, setTravelers] = useState<IRecommendedTraveler[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [currentUser, setCurrentUser] = useState<any>(null);
    const router = useRouter();

    // Fetch logged-in user info
    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUserInfo();
            setCurrentUser(user);
        };
        fetchUser();
    }, []);

    // Fetch recommended travelers
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        }
    };

    if (loading) return <p className="text-gray-500">Loading recommended travelers...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!travelers.length) return <p className="text-gray-500">No recommended travelers found.</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  mt-4 mb-4 pl-4 pr-4">
            {travelers.map((traveler) => (
                <Card
                    key={traveler.userId}
                    className="flex flex-col hover:shadow-xl transition-shadow duration-300"
                >
                    <CardHeader className="flex items-center gap-4 pb-2">
                        <Image
                            src={traveler.profilePhoto || "/default-avatar.png"}
                            alt={traveler.name}
                            width={60}
                            height={60}
                            className="rounded-full border-2 border-indigo-400"
                        />
                        <div>
                            <CardTitle className="text-gray-900">{traveler.name}</CardTitle>
                            <CardDescription className="text-gray-500 text-sm">
                                {traveler.email}
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-1">
                        <div className="flex flex-wrap gap-2">
                            {traveler.interests?.map((interest, idx) => (
                                <Badge key={idx} variant="secondary">
                                    {interest}
                                </Badge>
                            ))}
                        </div>

                        <p className="text-gray-600 text-sm mt-2">
                            {traveler.city}, {traveler.country}
                        </p>

                        <p className="text-gray-600 text-sm">Travel Style: {traveler.travelStyle}</p>

                        <Badge variant="outline" className="mt-1">
                            Match Score: {traveler.score}%
                        </Badge>
                    </CardContent>

                    <CardFooter className="flex justify-between mt-auto">
                        {/* View Details Modal */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">View Details</Button>
                            </DialogTrigger>

                            <DialogContent className="max-w-lg">
                                <DialogHeader>
                                    <DialogTitle>{traveler.name}</DialogTitle>
                                    <DialogDescription>
                                        <p>Email: {traveler.email}</p>
                                        <p>City: {traveler.city}</p>
                                        <p>Country: {traveler.country}</p>
                                        <p>Travel Style: {traveler.travelStyle}</p>
                                        <p>Interests: {traveler.interests?.join(", ")}</p>
                                        <p>Match Score: {traveler.score}%</p>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>

                        {/* Send Buddy Request */}
                        <Button
                            variant="default"
                            onClick={() => handleSendBuddyRequest(traveler.userId)}
                        >
                            Send Buddy Request
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
